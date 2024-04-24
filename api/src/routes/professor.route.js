const express = require('express');
const router = express.Router();
const professorController = require('../controller/professor.controller')
const professorMiddleware = require('../middleware/professor.middlewares')

// Busca todos os professores
router.get('/findAll', professorMiddleware.ValidRegisteredProfessors, professorController.findAll);

// Busca os professores pelo nome
router.get('/nome/:nome', professorController.findByName);

router.get('/cursos/:cursos', professorController.findbyCurse);

// Cria um professor
router.post('/createProfessor', professorMiddleware.ValidForm, professorController.createProfessor);

router.put('/:matriculaId', professorController.update);

// Deleta um professor
router.delete('/deleteProfessor/:matriculaId', professorController.delete);


module.exports = router;