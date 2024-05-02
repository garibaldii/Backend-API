import professorModel from '../model/professor.model.js';
import courseModel from '../model/course.model.js';

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find().populate('coursesId', 'nome');;

const findByNameService = (nome) => {
    professorModel.find({nome: {$regex: `.*${nome}.*`, $options: 'i'}}).populate('coursesId', 'nome');
}
//SUBSTITUIR POR UMA BUSCA PELO _id DO PROFESSOR
// const findByMatriculaIdService = (matriculaId) => 
//     professorModel.findOne(
//     {matriculaId: matriculaId}
//     );

const updateProfessorService = (infos) => {
    return professorModel.findOneAndUpdate(
    { matriculaId: infos.matriculaId }, infos,
    { new: true })
}

const deleteProfessorService = (matriculaId) => professorModel.findOneAndDelete({ matriculaId: matriculaId });

const findProfessorByCourseService = (coursesId) => professorModel.find({courses: { $in: coursesId }}).populate('coursesId', 'nome');


export default {
    createProfessorService,
    findAllService,
    findByNameService,
    findByMatriculaIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCourseService,
}