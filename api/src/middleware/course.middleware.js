import { check, validationResult } from 'express-validator';
import courseService from '../services/course.service.js';
import mongoose from 'mongoose';

const ValidForm = [
  check('nome')
    .notEmpty().trim().withMessage('O campo nome é obrigatório')
    .isAlpha().withMessage('O campo nome só pode ter letras')
    .isLength({ min: 3 }).withMessage('O campo nome precisa ter no mínimo 3 letras'),

  check('codCourse')
    .notEmpty().trim().withMessage('O campo codCourse é obrigatório')
    .isNumeric().withMessage('O campo codCourse só pode ter números')
    .isLength({ min: 5 }).withMessage('Informe no mínimo 5 dígitos'),

  check('sigla')
    .notEmpty().trim().withMessage('O campo sigla é obrigatório')
    .isAlpha().withMessage('O campo sigla precisa ter apenas letras'),

  check('modalidade')
    .notEmpty().withMessage('O campo modalidade é obrigatório')
    .isIn(["Presencial", "EAD", "Híbrido"]).withMessage('O campo modalidade precisa ser EAD, Presencial ou Híbrido'),

  check('disciplinas')
    .notEmpty().withMessage('O campo disciplinas é obrigatório')
    .isArray({ min: 1 }).withMessage('É necessário cadastrar pelo menos uma disciplina'),

  check('coordenador')
    .optional()
    .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('O coordenador precisa ser um ID válido');
        }
        return true;
      }),

  async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    req.infos = req.body;
    next();
  }
];

const ValidSearchCourse = async (req, res, next) => {
  try {
    const courses = await courseService.findAllCoursesService();

    if (!courses || courses.length === 0) {
      return res.status(400).send({ msg: "Não há cursos cadastrados" });
    }

    req.courses = courses;
    next();
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const ValidIdCourse = [
  async (req, res, next) => {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send({ msg: `O ID '${courseId}' não é válido` });
    }

    const course = await courseService.findCourseByIdService(courseId);

    if (!course) {
      return res.status(404).send({ msg: "Curso não encontrado" });
    }

    req.course = course;
    req.courseId = courseId;
    next();
  }
];


const checkCourseExistence = async (coursesId) => {
  if (!Array.isArray(coursesId)) {
    coursesId = [coursesId];
  }

  const registeredCourses = await courseService.findCoursesByIdService(coursesId);

  return registeredCourses && registeredCourses.length === coursesId.length;
};

export {
  ValidForm,
  ValidSearchCourse,
  ValidIdCourse,
  checkCourseExistence
};
