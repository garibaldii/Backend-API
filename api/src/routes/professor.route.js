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
router.get('/findAll', ValidRegisteredProfessors, findAll);

// Busca os professores pelo nome
router.get('/nome/:nome', findByName);

// Busca professor pelos cursos selecionados
router.get('/cursos/:curses', ValidCurse, findProfessorByCurse);

// Cria um professor
router.post('/createProfessor', ValidForm, createProfessor);

// Atualiza os dados de um professor
router.put('/update/:matriculaId', ValidMatriculaId, ValidUpdate, updateProfessor);

// Deleta um professor
router.delete('/deleteProfessor/:matriculaId', ValidMatriculaId, deleteProfessor);


export default router;