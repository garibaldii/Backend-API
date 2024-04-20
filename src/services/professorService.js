const professorModel = require('../model/professorModel');

const cadastrarProfessorService = (body) => professorModel.create(body);
const listarProfessoresService = () => professorModel.find();

module.exports = {
    cadastrarProfessorService,
    listarProfessoresService,
}