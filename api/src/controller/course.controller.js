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

const filterCourse = async (req, res) => {
    try {
        const {nome, modalidade, coordenador} = req.query

        let filter = {}
    
        if(nome){
            filter.nome = { $regex: nome, $options: 'i' }; // Filtrando por nome, case insensitive
        }

        if(modalidade){
            filter.modalidade = { $in: modalidade.split(',') }
        }

        if(coordenador){
            filter.coordenador = { $regex: coordenador, $options: 'i' } //Filtrando por nome do coordenador, case insensitive
        }

        const cursos = await courseService.filterCourseService(filter)

        res.json(cursos);


    } catch (error) {
        return res.status(500).json({message: `Erro ao buscar cursos ${error.message}`})
    }
}



export {
    createCourse,
    findAllCourses,
    deleteCourse,
    updateCourse,
    associateProfessorToCourse,
    desassociateProfessorFromCourse,
    filterCourse
}