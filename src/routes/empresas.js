const express = require('express');
const router = express.Router();

const empresaController = require('../controllers/empresaController');

router.get('/', empresaController.list);

router.post('/add', empresaController.create);

router.get('/delete/:id', empresaController.delete);

router.get('/update/:id', empresaController.edit);

router.post('/update/:id', empresaController.update);

router.get('/membresias/:id', empresaController.listMembresia);

router.post('/membresias/add', empresaController.createMembresia);

router.get('/membresias/delete/:id&:idEmp', empresaController.deleteMembresia);

router.get('/membresias/update/:id', empresaController.editMembresia);

router.post('/membresias/update/:id', empresaController.updateMembresia);

router.get('/membresias/listado/:id', empresaController.cliMembresia);


module.exports = router;