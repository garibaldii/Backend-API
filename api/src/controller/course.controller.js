import courseService from '../services/course.service.js';

const createCourse = async (req, res) => {
    try{
        const course = await courseService.createCourseService(req.infos);

        if (!course) {
        return res.status(400).send({message: "O professor não foi cadastrado"})
        }

        res.status(201).send({
            message: "O curso foi cadastrado com sucesso!",
            course: {course}
        })
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
} 

const findAllCourses = async (req, res) => {
    try {
        res.send(req.courses)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await courseService.deleteCourseService(req.courseId)
        res.status(200).send({message: "O curso foi deletado com sucesso!", courso: deletedCourse})
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourseService(req.courseId, req.infos)
        res.status(200).send({message: "Curso atualizado com sucesso!", course: updatedCourse})
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const associateProfessorToCourse = (professorId, coursesId) => {
    courseService.associateProfessorToCourseService(professorId, coursesId);
    
}

const desassociateProfessorFromCourse = (professorId, coursesId) => {
    courseService.desassociateProfessorFromCourseService(professorId, coursesId);
}



export {
    createCourse,
    findAllCourses,
    deleteCourse,
    updateCourse,
    associateProfessorToCourse,
    desassociateProfessorFromCourse
}