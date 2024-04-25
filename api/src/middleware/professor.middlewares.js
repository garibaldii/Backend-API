const professorService = require('../services/professor.service');
const { body, validationResult } = require('express-validator');

const ValidRegisteredProfessors = async (req, res, next) => {
  
  try {
    const professors = await professorService.findAllService();

    if (!professors || professors.length === 0) {
      return res.statu(400).send({message: "Não há professores cadastrados"})
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
    const {nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email} = req.body;

    if (!nome || !matriculaId || !unidadeId || !titulacao || !referencia || !lattes || !cursos || !email) {
      res.status(400).send({message: "Todos os campos precisam ser preenchidos"})
    }

    req.infos = {nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email};
    
    next()
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidMatriculaId = async (req, res, next) => {

  try {
    const matriculaId = req.params.matriculaId;

    const professor = await professorService.findByMatriculaIdService(matriculaId);

    if (!professor) {
      return res.status(404).send({message: "Não há professor com esse número de matrícula"})
    }

    req.matriculaId = matriculaId;
    //req.professor = professor;
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidUpdate = async (req, res, next) => {
  try {
    const {
    nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email, statusAtividade, notes} = req.body;

    if (
      !nome &&
      !matriculaId && 
      !unidadeId && 
      !titulacao && 
      !referencia && 
      !lattes && 
      !cursos && 
      !email && 
      !statusAtividade && 
      !notes) {
      res.status(400).send({message: "Pelo menos 1 campo precisa ser atualizado"})
    }

    req.infos = {nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email, statusAtividade, notes}

    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const ValidCurse = async (req, res, next) => {
  let cursos = req.params.cursos;
  cursos = cursos.split(',')
  

}
module.exports = {
    ValidRegisteredProfessors,
    ValidForm,
    ValidMatriculaId,
    ValidUpdate,
    ValidCurse
}