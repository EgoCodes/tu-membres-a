const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empresa', (err, empresas) => {
            if(err){
                res.json(err);
            }else{
                res.render('empresa', {
                    titulo: 'Empresas registradas',
                    data: empresas
                });
            }
        });
    });
};

controller.create = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO empresa SET ?', [data], (err, rows) => {
            res.redirect('/empresas');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM empresa WHERE id = ?', [id], (err, rows) => {
            res.redirect('/empresas');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empresa WHERE id = ?', [id], (err, rows) => {
            res.render('empresaEdit', {
                titulo: 'Actualizar empresa',
                data: rows[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE empresa SET ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/empresas');
        });
    });
};

//membresias de la empresa
controller.listMembresia = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM membresia WHERE idEmpresa = ?', [id], (err, membresias) => {
            if(err){
                res.json(err);
            }else{
                res.render('membresia', {
                    titulo: 'Membresias',
                    id: id,
                    data: membresias
                });
            }
        });
    });
};

controller.createMembresia = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO membresia SET ?', [data], (err, rows) => {
            res.redirect('/empresas/membresias/'+data.idEmpresa);
        });
    });
};

controller.deleteMembresia = (req, res) => {
    const { id } = req.params;
    const { idEmp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM membresia WHERE id = ?', [id], (err, rows) => {
            res.redirect('/empresas/membresias/'+idEmp);
        });
    });
};

controller.editMembresia = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM membresia WHERE id = ?', [id], (err, rows) => {
            res.render('membresiaEdit', {
                titulo: 'Actualizar Membresia',
                data: rows[0]
            });
        });
    });
};

controller.updateMembresia = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE membresia SET ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/empresas/membresias/'+data.idEmpresa);
        });
    });
};

controller.cliMembresia = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query(`SELECT p.nombrePersona, (m.precio*mc.cuenta) AS "ganancia" FROM membresiacomprada mc
        INNER JOIN persona p ON p.id = mc.idPersona
        INNER JOIN membresia m ON m.id = mc.idMembresia
        WHERE mc.idMembresia = ?`, [id], (err, clientes) => {
            if(err){
                res.json(err);
            }else{
                res.send(clientes);
                // res.render('listado', {
                //     titulo: 'Lista de clientes',
                //     data: clientes
                // });
            }
        });
    });
};

module.exports = controller;