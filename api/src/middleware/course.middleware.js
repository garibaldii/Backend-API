import courseService from '../services/course.service.js';
//import { body, validationResult } from 'express-validator';

const ValidForm = (req, res, next) => {
    try {
    const {nome, codCourse, sigla, modalidade, disciplinas, coordenador} = req.body

    if(!nome || !codCourse || !sigla || !modalidade || !disciplinas || !coordenador) {
        res.status(400).send({message: 'Todos os campos precisam ser preechidos'})
    }

    req.infos = {nome, codCourse, sigla, modalidade, disciplinas, coordenador}

    next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
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

const ValidCodCourse = async (req, res, next) => {
    try {
        const codCourse = req.params.codCourse

        const course = await courseService.findCourseByCodService(codCourse)

        if(!course) {
            return res.status(400).send({message: "Curso não encontrado"})
        }

        req.course = course
        req.codCourse = codCourse

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidUpdate = async (req, res, next) => {
    try {
        const {nome, codCourse, sigla, modalidade, disciplinas, coordenador} = req.body

        if(!nome && !codCourse && !sigla && !modalidade && !disciplinas && disciplinas.length == 0 && !coordenador) {
            res.status(400).send({message: 'Ao menos 1 campo precisa ser alterado'})
        }

        req.infos = {nome, codCourse, sigla, modalidade, disciplinas, coordenador}

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export {
    ValidForm,
    ValidSearchCourse,
    ValidCodCourse,
    ValidUpdate
}