const express = require('express');
const router = express.Router();

const personaController = require('../controllers/personaController');

router.get('/', personaController.list);

router.post('/add', personaController.create);

router.get('/delete/:id', personaController.delete);

router.get('/update/:id', personaController.edit);

router.post('/update/:id', personaController.update);

router.get('/comprar/:idPer', personaController.listMembresias);

router.post('/comprar/:idPer', personaController.createMembresia);

router.get('/comprar/delete/:id&:idPer', personaController.deleteMembresia);

router.get('/comprar/update/:id&:idPer&:dias', personaController.updateMembresia);

module.exports = router;