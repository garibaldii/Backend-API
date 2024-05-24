import professorModel from '../model/professor.model.js';

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find().populate('coursesId', 'nome');;

const findByNameService = (nome) => {
    return professorModel.find({ nome: { $regex: `.*${nome}.*`, $options: 'i' } }).populate('coursesId', 'nome').exec();
}

  

const findByIdService = (professorId) => professorModel.findOne({_id: professorId});

const updateProfessorService = (infos) => {
    return professorModel.findOneAndUpdate(
    { matriculaId: infos.matriculaId }, infos,
    { new: true })
}

const deleteProfessorService = (professorId) => professorModel.findOneAndDelete({ _id: professorId });

const findProfessorByCourseService = (coursesId) => professorModel.find({courses: { $in: coursesId }}).populate('coursesId', 'nome');


export default {
    createProfessorService,
    findAllService,
    findByNameService,
    findByIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCourseService,
}