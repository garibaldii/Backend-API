import professorService from '../services/professor.service.js' ;
import courseService from '../services/course.service.js';
import { checkCourseExistence } from '../middleware/course.middleware.js'
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
    if (!checkCourseExistence(coursesId)) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
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
    let ids = req.params.id;
    ids = ids.split(',')

    for (let id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: `O ID '${id}' não é válido` });
      }
    }

    if (!checkCourseExistence(ids)) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
    }

    req.coursesId = ids; //Caso seja um curso
    req.id = ids; // Caso seja um professor

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
    if (!checkCourseExistence(coursesId)) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
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
    const coursesId = req.params.courseId;
    
    const regiteredCourses = await courseService.findCoursesByIdService(coursesId);

    //Validação da existência do(s) curso(s) no DB
    if (!checkCourseExistence(coursesId)) {
      res.status(400).send({message: "Todos cursos precisam existir na base de dados, algum coursesId inválido"})
    }

    req.coursesId = coursesId;
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