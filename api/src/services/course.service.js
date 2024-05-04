import courseModel from '../model/course.model.js';

const createCourseService = (infos) => courseModel.create(infos);

const findAllCoursesService = () => courseModel.find();

const findCourseByCodService = (codCourse) => courseModel.findOne({codCourse: codCourse});

const deleteCourseService = (codCourse) => courseModel.findOneAndDelete({codCourse: codCourse});

const updateCourseService = (codCourse, infos) => {
    return courseModel.findOneAndUpdate(
    { codCourse: codCourse }, infos,
    { new: true })
}

const findCoursesByIdService = (courseId) => courseModel.find({_id: {$in: courseId}});

const associateProfessorToCourseService = (professorId, courseIds) => {
    return courseModel.updateMany(
        { _id: { $in: courseIds } }, 
        { $addToSet: { professors: professorId } },
        { new: true }
    );
}

const desassociateProfessorFromCourseService = (professorId, courseId) => {
    courseModel.updateMany(
        { _id: { $in: courseId } },
        { $pull: { professors: professorId } }
    );
}


export default {
    createCourseService,
    findAllCoursesService,
    findCourseByCodService,
    deleteCourseService,
    updateCourseService,
    findCoursesByIdService,
    associateProfessorToCourseService,
    desassociateProfessorFromCourseService
}