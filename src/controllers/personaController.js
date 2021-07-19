const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM persona', (err, personas) => {
            if (err) {
                res.json(err);
            } else {
                res.render('persona', {
                    titulo: 'personas registradas',
                    data: personas
                });
            }
        });
    });
};

controller.create = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO persona SET ?', [data], (err, rows) => {
            res.redirect('/personas');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM persona WHERE id = ?', [id], (err, rows) => {
            res.redirect('/personas');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM persona WHERE id = ?', [id], (err, rows) => {
            res.render('personaEdit', {
                titulo: 'Actualizar información personal',
                data: rows[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE persona SET ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/personas');
        });
    });
};

function borrador(req, res){
    req.getConnection((err, per) => {
        per.query(`SELECT mc.id FROM membresiacomprada mc
            INNER JOIN membresia m ON m.id = mc.idMembresia 
            INNER JOIN empresa e ON e.id = m.idEmpresa
            INNER JOIN persona p ON p.id = mc.idPersona 
            WHERE (mc.fechaFinMembresia- now()) < 0`, (err, borr) => {
            if (err) {
                res.json(err);
            } else {
                for(let i = 0; i < borr.length; i++){
                    req.getConnection((err, conn) => {
                        conn.query('DELETE FROM membresiacomprada WHERE id = ?', [borr[i].id]);
                    });
                }
            }
        });
    });
};

// membresias por parte del cliente
controller.listMembresias = (req, res) => {
    const { idPer } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT e.nombreEmpresa, m.id, m.nombreMembresia, m.tipo, m.duracion, m.precio FROM empresa e INNER JOIN membresia m ON m.idEmpresa = e.id ORDER BY e.nombreEmpresa', (err, membresias) => {
            if (err) {
                res.json(err);
            } else {
                borrador(req, res);
                req.getConnection((err, per) => {
                    per.query(`SELECT mc.id, mc.idMembresia, e.nombreEmpresa, m.nombreMembresia, m.precio, mc.fechaFinMembresia, m.duracion, mc.idPersona FROM membresiacomprada mc
                        INNER JOIN membresia m ON m.id = mc.idMembresia 
                        INNER JOIN empresa e ON e.id = m.idEmpresa
                        INNER JOIN persona p ON p.id = mc.idPersona 
                        WHERE p.id = ?`, [idPer],(err, persona) => {
                        if (err) {
                            res.json(err);
                        } else {
                            res.render('comprar', {
                                titulo: 'Membresias disponibles para la compra',
                                compras: persona,
                                pers: idPer,
                                data: membresias
                            });
                        }
                    });
                });
                
            }
        });
    });
};

controller.createMembresia = (req, res) => {
    const { idPer } = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT DATE_ADD(NOW(), INTERVAL ? DAY) AS "fecha"', [data.fechaFinMembresia], (err, days) => {
            data.fechaFinMembresia = days[0].fecha;
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO membresiacomprada SET ?', [data], (err, rows) => {
                    res.redirect('/personas/comprar/'+idPer);
                });
            });
        });
    });
    
};

controller.deleteMembresia = (req, res) => {
    const { id } = req.params;
    const { idPer } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM membresiacomprada WHERE id = ?', [id], (err, rows) => {
            res.redirect('/personas/comprar/'+idPer);
        });
    });
};

controller.updateMembresia = (req, res) => {
    const { id } = req.params;
    const { idPer } = req.params;
    const { dias } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT DATE_ADD(NOW(), INTERVAL ? DAY) AS "fecha"', [dias], (err, days) => {
            req.getConnection((err, cn) => {
                cn.query('UPDATE membresiacomprada SET fechaFinMembresia = ? WHERE id = ?', [days[0].fecha, id], (err, rows) => {
                    res.redirect('/personas/comprar/'+idPer);
                });
            });
        });
    });
};

//para cuando se actualice
//UPDATE `membresiacomprada` SET `fechaFinMembresia` = (SELECT DATE_ADD(NOW(), INTERVAL 5 DAY) FROM membresiacomprada mc WHERE mc.id = 3) WHERE `membresiacomprada`.`id` = 3 
module.exports = controller;