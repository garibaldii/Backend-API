import { Router } from 'express';
const router = Router();

import {
    findAllCurses,
    createCurse,
    updateCurse,
    deleteCurse
} from '../controller/curse.controller.js';

import {
    ValidForm,
    ValidSearchCurse,
    ValidCodCurse,
    ValidUpdate
} from '../middleware/curse.middleware.js';

// Busca todos os cursos
router.get('/', ValidSearchCurse, findAllCurses);

// Cadastra um novo curso
router.post('/', ValidForm, createCurse);

// Atualiza os dados de algum curso
router.put('/:codCurse', ValidCodCurse, ValidUpdate, updateCurse);

// Remove um curso da base de dados
router.delete('/:codCurse', ValidCodCurse, deleteCurse);

export default router;