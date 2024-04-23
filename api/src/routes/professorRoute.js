const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController')

router.post('/', professorController.cadastrarProfessor);

router.get('/', professorController.buscarTodosProfessores);
router.get('/nome/:nome', professorController.buscarProfessoresNome);
router.get('/num_professores', professorController.numeroProfessores);
router.get('/cursos/:cursos', professorController.buscarProfessorPeloCurso);

router.put('/:numero_matricula', professorController.atualizarProfesor);

router.delete('/:numero_matricula', professorController.removeProfessor);


module.exports = router;