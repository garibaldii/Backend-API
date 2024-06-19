import professorModel from '../model/professor.model.js';

const createProfessorService = (dadosProfessor) => professorModel.create(dadosProfessor);

const findAllService = () => professorModel.find().populate('coursesId', 'nome sigla');;

const findByNameService = (nome) => {
    return professorModel.find({ nome: { $regex: `.*${nome}.*`, $options: 'i' } }).populate('coursesId', 'nome sigla').exec();
}

  

const findByIdService = (professorId) => professorModel.findOne({_id: professorId});

const updateProfessorService = (id, infos) => {
    return professorModel.findOneAndUpdate(
    { _id: id }, infos,
    { new: true })
}

const deleteProfessorService = (professorId) => professorModel.findOneAndDelete({ _id: professorId });

const findProfessorByCourseService = (coursesId) => professorModel.find({courses: { $in: coursesId }}).populate('coursesId', 'nome sigla');

const filterProfessorService = (filter) => professorModel.find(filter).populate('coursesId')




export default {
    createProfessorService,
    findAllService,
    findByNameService,
    findByIdService,
    updateProfessorService,
    deleteProfessorService,
    findProfessorByCourseService,
    filterProfessorService
}