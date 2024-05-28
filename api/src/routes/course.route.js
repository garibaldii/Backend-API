import { Router } from 'express';
const router = Router();

import {
    findAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    filterCourse
} from '../controller/course.controller.js';

import {
    ValidForm,
    ValidSearchCourse,
    ValidIdCourse,
    ValidUpdate,
} from '../middleware/course.middleware.js';

// Busca todos os cursos
router.get('/', ValidSearchCourse, findAllCourses);

//Filtra curso
router.get('/filter', filterCourse);

// Cadastra um novo curso
router.post('/', ValidForm, createCourse);

// Atualiza os dados de algum curso
router.put('/:id', ValidIdCourse, ValidUpdate, updateCourse);

// Remove um curso da base de dados
router.delete('/:id', ValidIdCourse, deleteCourse);


export default router;