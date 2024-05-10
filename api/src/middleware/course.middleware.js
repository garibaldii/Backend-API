import courseService from '../services/course.service.js';
//import { body, validationResult } from 'express-validator';

const ValidForm = (req, res, next) => {
    try {
    const {nome, codCourse, sigla, modalidade, disciplinas, coordenador} = req.body

    if(!nome || !codCourse || !sigla || !modalidade || !disciplinas) {
        return res.status(400).send({message: 'Todos os campos precisam ser preechidos'})
    }

    req.infos = {nome, codCourse, sigla, modalidade, disciplinas, coordenador}

    next()
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const ValidSearchCourse = async (req, res, next) => {
    try {
        const courses = await courseService.findAllCoursesService();

        if (!courses || courses.length === 0) {
        return res.status(400).send({message: "Não há cursos cadastrados"})
        }

        req.courses = courses;
        
        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidIdCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id

        const course = await courseService.findCourseByIdService(courseId)

        if (!checkCourseExistence(courseId)) {
            res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
        }

        req.course = course
        req.courseId = courseId

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidUpdate = async (req, res, next) => {
    try {
        const coursesId = req.id;
        const {nome, codCourse, sigla, modalidade, disciplinas, coordenador} = req.body

        if(!nome && !codCourse && !sigla && !modalidade && !disciplinas && disciplinas.length == 0 && !coordenador) {
            res.status(400).send({message: 'Ao menos 1 campo precisa ser alterado'})
        }

        if (!checkCourseExistence(coursesId)) {
            res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
        }

        req.infos = {nome, codCourse, sigla, modalidade, disciplinas, coordenador}

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const checkCourseExistence = async (coursesId) => { 

    if (!Array.isArray(coursesId)) {
        coursesId = [coursesId];
    }

    const regiteredCourses = await courseService.findCoursesByIdService(coursesId);

    if (!regiteredCourses || regiteredCourses.length !== coursesId.length) {
        return false;
    }
    return true;
}

export {
    ValidForm,
    ValidSearchCourse,
    ValidIdCourse,
    ValidUpdate,
    checkCourseExistence
}