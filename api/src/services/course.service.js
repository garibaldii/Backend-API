import courseModel from '../model/course.model.js';

const createCourseService = (infos) => courseModel.create(infos);

const findAllCoursesService = () => courseModel.find().populate('professors', 'nome');

const findCourseByIdService = (courseId) => courseModel.findOne({_id: courseId});

const deleteCourseService = (courseId) => courseModel.findOneAndDelete({_id: courseId});

const updateCourseService = (courseId, infos) => {
    return courseModel.findOneAndUpdate(
    { _id: courseId },
    infos,
    { new: true })
}
const findCoursesByIdService = (courseId) => courseModel.find({_id: {$in: courseId}});

const associateProfessorToCourseService = (professorId, coursesId) => {
    courseModel.updateMany(
        { _id: { $in: coursesId } }, 
        { $addToSet: { professors: professorId } },
        { new: true }
    );
}

const desassociateProfessorFromCourseService = (professorId, coursesId) => {
    courseModel.updateMany(
        { _id: { $in: coursesId } },
        { $pull: { professors: professorId } }
    );
}

const filterCourseService = async (filter) => {
    try {
        return await courseModel.find(filter);
    } catch (error) {
        throw new Error('Erro ao filtrar cursos: ' + error.message);
    }
};


export default {
    createCourseService,
    findAllCoursesService,
    findCourseByIdService,
    deleteCourseService,
    updateCourseService,
    findCoursesByIdService,
    associateProfessorToCourseService,
    desassociateProfessorFromCourseService,
    filterCourseService
}