const professorModel = require('../model/professor.model');
const curseModel = require('../model/curse.model');

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find();

const findByNameService = (nome) => professorModel.find({nome: {$regex: `.*${nome}.*`, $options: 'i'}});

const findByMatriculaIdService = (matriculaId) => 
    professorModel.findOne(
    {matriculaId: matriculaId}
    );

const updateProfessorService = (
    nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email, statusAtividade, notes) => {
    professorModel.findOneAndUpdate(
    { matriculaId: matriculaId },
    { nome, matriculaId, unidadeId, titulacao, referencia, lattes, cursos, email, statusAtividade, notes })
}

const deleteProfessorService = (matriculaId) => professorModel.findOneAndDelete({ matriculaId: matriculaId });

const findbyCurseService = (cursos) => professorModel.find( {curso: {$in: cursos}} );

module.exports = {
    createProfessorService,
    findAllService,
    findByNameService,
    findByMatriculaIdService,
    updateProfessorService,
    deleteProfessorService,
    findbyCurseService
}