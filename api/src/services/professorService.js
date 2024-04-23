const professorModel = require('../model/professorModel');

const cadastrarProfessorService = (body) => professorModel.create(body);

const listarProfessoresService = () => professorModel.find();

const buscarProfessoresNomeService = (nome) => professorModel.find({nome: {$regex: `.*${nome}.*`, $options: 'i'}});

const buscaProfessorPorNumeroMatriculaService = (numeroMatricula) => 
    professorModel.findOne(
    {numero_matricula: numeroMatricula}
    );

const atualizarProfessorService = (
    nome,
    numero_matricula,
    cod_ue,
    titulacao,
    referencia,
    lates,
    curso,
    email,
    observacoes
) => 
    professorModel.findOneAndUpdate(
    { numero_matricula: numero_matricula },
    { nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes }
    ); 

const removeProfessorService = (numeroMatricula) => professorModel.findOneAndDelete({ numero_matricula: numeroMatricula });

const buscarProfessorPeloCursoService = (cursos) => professorModel.find( {curso: {$in: cursos}} );

module.exports = {
    cadastrarProfessorService,
    listarProfessoresService,
    buscarProfessoresNomeService,
    buscaProfessorPorNumeroMatriculaService,
    atualizarProfessorService,
    removeProfessorService,
    buscarProfessorPeloCursoService
}