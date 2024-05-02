import professorService from '../services/professor.service.js' ;
import courseService from '../services/course.service.js';
import mongoose from 'mongoose';
//import { body, validationResult } from 'express-validator';

const ValidRegisteredProfessors = async (req, res, next) => {
  
  try {
    const professors = await professorService.findAllService();

    if (!professors || professors.length === 0) {
      return res.status(400).send({message: "Não há professores cadastrados"})
    }

    req.professors = professors;
    
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidForm = async (req, res, next) => {
  try {
    const {nome, matriculaId, unidadeId, titulacao, referencia, lattes, coursesId, email, notes} = req.body;

    if (!nome || !matriculaId || !unidadeId || !titulacao || !referencia
      || !lattes || !coursesId || coursesId.length == 0 || !email) {
      res.status(400).send({message: "Todos os campos obirgatórios precisam ser preenchidos"})
    }

    //Validação da existência do(s) curso(s) no DB
    const regiteredCourses = await courseService.findCoursesByIdService(coursesId);

    if(!regiteredCourses || regiteredCourses.length === coursesId.length) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum courseId inválido"})
    }

    req.infos = {nome, matriculaId, unidadeId, titulacao, referencia, lattes, coursesId, email, notes};

    next()
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidId = async (req, res, next) => {
  try {
    const ids = req.params.id;

    for (const id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: `O ID '${id}' não é válido` });
      }
    }

    req.courseId = ids;
    req.id = ids;

    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidUpdate = async (req, res, next) => {
  try {
    const {
    nome, matriculaId, unidadeId, titulacao, referencia, lattes, coursesId, email, statusAtividade, notes} = req.body;

    if (
      !nome &&
      !matriculaId && 
      !unidadeId && 
      !titulacao && 
      !referencia && 
      !lattes && 
      !coursesId && 
      coursesId.length == 0 && 
      !email && 
      !statusAtividade && 
      !notes) {
      res.status(400).send({message: "Pelo menos 1 campo precisa ser atualizado"})
    }

    //Validação da existência do(s) curso(s) no DB
    const regiteredCourses = await courseService.findCoursesByIdService(coursesId);

    if(!regiteredCourses || regiteredCourses.length === coursesId.length) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum courseId inválido"})
    }

    req.infos = {nome, matriculaId, unidadeId, titulacao, referencia, lattes, coursesId, email, statusAtividade, notes}

    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidSearchCourse = async (req, res, next) => {
  try {
    const courseId = req.courseId;
    
    const regiteredCourses = await courseService.findCoursesByIdService(courseId);

    if(!regiteredCourses || regiteredCourses.length === courseId.length) {
      res.status(400).send({message: 'Algum dos cursos mencionados não estão na base de dados!'})
    }

    req.courseId = courseId;
    req.regiteredCourses = regiteredCourses;

    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export {
    ValidRegisteredProfessors,
    ValidForm,
    ValidId,
    ValidUpdate,
    ValidSearchCourse
}