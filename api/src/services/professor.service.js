const professorModel = require('../model/professor.model');
const curseModel = require('../model/curse.model');

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find();

const findByNameService = (nome) => professorModel.find({nome: {$regex: `.*${nome}.*`, $options: 'i'}});

const findByMatriculaIdService = (matriculaId) => 
    professorModel.findOne(
    {matriculaId: matriculaId}
    );

const updateProfessorService = (infos) => {
    return professorModel.findOneAndUpdate(
    { matriculaId: infos.matriculaId }, infos,
    { new: true })
}

const deleteProfessorService = (matriculaId) => professorModel.findOneAndDelete({ matriculaId: matriculaId });

const findProfessorByCurseService = (cursos) => professorModel.find({curso: { $in: cursos }});

const findCurseByNameService = (cursos) => curseModel.find({nome: { $in: cursos }});

module.exports = {
    createProfessorService,
    findAllService,
    findByNameService,
    findByMatriculaIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCurseService,
    findCurseByNameService
}