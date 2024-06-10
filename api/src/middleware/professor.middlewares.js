import { check, validationResult } from "express-validator";
import professorService from "../services/professor.service.js";
import courseService from "../services/course.service.js";
import { checkCourseExistence } from "../middleware/course.middleware.js";
import mongoose from "mongoose";

const ValidRegisteredProfessors = async (req, res, next) => {
  try {
    const professors = await professorService.findAllService();

    if (!professors || professors.length === 0) {
      return res
        .status(400)
        .send({ msg: "Não há professores cadastrados" });
    }

    req.professors = professors;

    next();
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const ValidForm = [
  check("nome")
    .notEmpty().trim().withMessage("Esse campo é obrigatório")
    .isAlpha().withMessage("Esse campo só pode ter letras")
    .isLength({min: 3}).withMessage("Esse campo precisa ter no mínimo 3 letras"),

  check("matriculaId")
    .notEmpty().trim().withMessage("Esse campo é obrigatório")
    .isNumeric().withMessage("Esse campo só pode ter números")
    .isLength({min: 5}).withMessage("Informe no mínimo 5 dígitos"),

  check("unidadeId")
    .notEmpty().trim().withMessage("O campo unidadeId é obrigatório")
    .isAlphanumeric().withMessage("O campo unidadeId precisa ter apenas letras ou números"),

  check("titulacao")
    .notEmpty().trim().withMessage("O campo titulacao é obrigatório"),

  check("referencia")
    .notEmpty().trim().withMessage("O campo referencia é obrigatório")
    .isLength({min: 8}).withMessage("Esse campo é precisa ter no mínimo 14 caracteres"),

  check("lattes")
    .notEmpty().trim().withMessage("O campo lattes é obrigatório")
    .isURL().withMessage("O campo lattes precisa ser uma url válida"),

  check("coursesId")
    .notEmpty().trim().isArray({ min: 1 }).withMessage("É necessário fornecer pelo menos um ID de curso"),

  check("email")
    .notEmpty().trim().withMessage("O campo email é obrigatório")
    .isEmail().withMessage("O campo precisa ser um e-mail válido"),

  check("statusAtividade")
    .optional().trim().default("Ativo").isIn(["Ativo", "Inativo"]).withMessage('O campo só recebe "Ativo" ou "Inativo"'),

  check("notes")
    .optional().trim().default("Não há observações")
    .isLength({max: 40}).withMessage("A observação não pode passar de 40 caracteres"),

  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).send({ err: err.array() });
    }

    //Validação da existência do(s) curso(s) no DB
    const { coursesId } = req.body;
    if (!checkCourseExistence(coursesId)) {
      return res.status(400).send({msg:"Todos cursos precisam existir na base de dados, algum coursesId inválido",});
    }

    req.infos = req.body;

    next();
  },
];

const ValidId = [
  async (req, res, next) => {
    let ids = req.params.id;
    ids = ids.split(",");

    for (let id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ msg: `O ID '${id}' não é válido` });
      }
    }

    if (!checkCourseExistence(ids)) {
      res.status(400).send({msg:"Todos cursos precisam existir na base de dados, algum coursesId inválido"});
    }

    req.coursesId = ids; //Caso seja um curso
    req.id = ids; // Caso seja um professor

    next();
  },
];


const ValidSearchCourse = [
  async (req, res, next) => {
    const coursesId = req.params.courseId;

    const regiteredCourses = await courseService.findCoursesByIdService(
      coursesId
    );

    //Validação da existência do(s) curso(s) no DB
    if (!checkCourseExistence(coursesId)) {
      res.status(400).send({msg: "Todos cursos precisam existir na base de dados, algum coursesId inválido",});
    }

    req.coursesId = coursesId;
    req.regiteredCourses = regiteredCourses;

    next();
  },
];

export {
  ValidRegisteredProfessors,
  ValidForm,
  ValidId,
  ValidSearchCourse,
};
