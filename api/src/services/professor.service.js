const professorModel = require('../model/professor.model');

const createProfessorService = (dadosPrfessor) => professorModel.create(dadosPrfessor);

const findAllService = () => professorModel.find();

const findByNameService = (nome) => professorModel.find({nome: {$regex: `.*${nome}.*`, $options: 'i'}});

const findByMatriculaIdService = (numeroMatricula) => 
    professorModel.findOne(
    {numero_matricula: numeroMatricula}
    );

const updateProfessorService = (
    nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes) => 
    professorModel.findOneAndUpdate(
    { numero_matricula: numero_matricula },
    { nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes }); 

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