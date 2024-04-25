const express = require('express');
const router = express.Router();
const professorController = require('../controller/professor.controller')
const {
    ValidRegisteredProfessors,
    ValidForm,
    ValidUpdate,
    ValidMatriculaId,
    ValidCurse
} = require('../middleware/professor.middlewares')


// Busca todos os professores
router.get('/findAll', ValidRegisteredProfessors, professorController.findAll);

// Busca os professores pelo nome
router.get('/nome/:nome', professorController.findByName);

// Busca professor pelos cursos selecionados
router.get('/cursos/:cursos', ValidCurse, professorController.findProfessorByCurse);

// Cria um professor
router.post('/createProfessor', ValidForm, professorController.createProfessor);

// Atualiza os dados de um professor
router.put('/update/:matriculaId', ValidUpdate, ValidMatriculaId, professorController.updateProfessor);

// Deleta um professor
router.delete('/deleteProfessor/:matriculaId', ValidMatriculaId, professorController.deleteProfessor);


module.exports = router;