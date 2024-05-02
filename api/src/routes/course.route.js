import { Router } from 'express';
const router = Router();

import {
    findAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controller/course.controller.js';

import {
    ValidForm,
    ValidSearchCourse,
    ValidCodCourse,
    ValidUpdate,
} from '../middleware/course.middleware.js';

// Busca todos os cursos
router.get('/', ValidSearchCourse, findAllCourses);

// Cadastra um novo curso
router.post('/', ValidForm, createCourse);

// Atualiza os dados de algum curso
router.put('/:codCourse', ValidCodCourse, ValidUpdate, updateCourse);

// Remove um curso da base de dados
router.delete('/:codCourse', ValidCodCourse, deleteCourse);


export default router;