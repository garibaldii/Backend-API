import professorModel from '../model/professor.model.js';
import curseModel from '../model/curse.model.js';

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

//Mudar a forma com que busca os cursos
const findProfessorByCurseService = (cursos) => professorModel.find({curso: { $in: cursos }});

const findCurseByNameService = (cursos) => curseModel.find({nome: { $in: cursos }});

export default {
    createProfessorService,
    findAllService,
    findByNameService,
    findByMatriculaIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCurseService,
    findCurseByNameService
}