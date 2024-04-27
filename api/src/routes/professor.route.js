import { Router } from 'express';
const router = Router();

import {
    findAll,
    findByName,
    findProfessorByCurse,
    createProfessor,
    updateProfessor,
    deleteProfessor
} from '../controller/professor.controller.js'

import {
    ValidRegisteredProfessors,
    ValidForm,
    ValidUpdate,
    ValidMatriculaId,
    ValidCurse
} from'../middleware/professor.middlewares.js';


// Busca todos os professores
router.get('/', ValidRegisteredProfessors, findAll);

// Busca os professores pelo nome
router.get('/name/:nome', findByName);

// Busca professor pelos cursos selecionados
router.get('/curses/:curses', ValidCurse, findProfessorByCurse);

// Cria um professor
router.post('/', ValidForm, createProfessor);

// Atualiza os dados de um professor
router.put('/:matriculaId', ValidMatriculaId, ValidUpdate, updateProfessor);

// Deleta um professor
router.delete('/:matriculaId', ValidMatriculaId, deleteProfessor);


export default router;