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

const associateProfessorToCourseService = (courseId, professorId) => {
    return courseModel.findOneAndUpdate(
    { _id: courseId }, 
    { $addToSet: { professors: professorId } },
    { new: true }
    );
}

export default {
    createCourseService,
    findAllCoursesService,
    findCourseByCodService,
    deleteCourseService,
    updateCourseService,
    findCoursesByIdService,
    associateProfessorToCourseService
}