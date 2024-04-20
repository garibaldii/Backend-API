const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController');

/*router.get('/', professorController.listarProfessores);
router.post('/', professorController.criarProfessor);
router.get('/:id', professorController.obterProfessor);
router.put('/:id', professorController.atualizarProfessor);
router.delete('/:id', professorController.deletarProfessor);*/

router.get('/', professorController.create)

module.exports = router;