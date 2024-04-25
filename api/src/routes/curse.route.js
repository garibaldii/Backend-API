const express = require('express');
const router = express.Router();
const curseController = require('../controller/curse.controller')
const {
    ValidForm,
    ValidSearchCurse
} = require('../middleware/curse.middleware')

// Busca todos os cursos
router.get('/findAll', ValidSearchCurse, curseController.findAllCurses);

// Cadastra um novo curso
router.post('/createCurse', ValidForm, curseController.createCurse);

// Atualiza os dados de algum curso
router.put('/updateCurse/:codCurse', curseController.updateCurse);

// Remove um curso da base de dados
router.delete('/deleteCurse/:codCurse', curseController.deleteCurse);

module.exports = router;