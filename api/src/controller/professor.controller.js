import { associateProfessorToCourse } from '../controller/course.controller.js'
import professorService from '../services/professor.service.js';

// Cadastra professores - post('/createProfessor')
const createProfessor = async (req, res) => {
  try {
    const professor = await professorService.createProfessorService(req.infos);

    if (!professor) {
      return res.status(400).send({message: "O professor não foi cadastrado"})
    }

    const teste = await associateProfessorToCourse(professor._id, professor.coursesId);

    res.status(201).send({
      message: "O professor foi cadastrado com sucesso!",
      professor: {professor},
      cursoAssociado: teste
    })
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Busca todos os professores - get('/findAll')
const findAll = async (req, res) => {
  try {
    res.status(200).send(req.professors)
  }
  catch (err) {
    res.status(500).send({ message: `FindAllError ${err.message}`});
  }

}

// Busca os professores pelo nome - get('/nome/:nome')
const findByName = async (req, res) => {
  try {
    const nome = req.params.nome;

    const professors = await professorService.findByNameService(nome);

    if (!professors || professors.length == 0) {
      return res.status(400).send({message: "Não há professores cadastrados com esse nome"})
    }

    res.send(professors)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Atualiza dados de um professor pelo numero de matricula - put('/update/numero_de_matricula')
const updateProfessor = async (req, res) => {
  try {
    const updatedProfessor = await professorService.updateProfessorService(req.infos);

    res.status(201).send({
      message: "O professor foi atualizado com sucesso!",
      professor: {updatedProfessor},
      cursoAssociado: teste
    })
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Deleta um professor da base de dados - delete('/delete/:matriculaId')
const deleteProfessor = async (req, res) => {

  try {
    await professorService.deleteProfessorService(req.matriculaId);
    /* TESTAR SE O PROFESSOR EXISTE NA BASE DE DADOS
    APÓS O DELETE COM if(!professor) E IMPORTAR O req.professor
    DO MIDDLEWARE PARA REALIZAR ESSA VALIDAÇÃO*/
    res.status(200).send({
      message: "Professor removido com sucesso!"
    })
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Buscar os professores pelos cursos selecionados - get('/courses/:courses')
const findProfessorByCourse = async (req, res) => {
  try {
    const professores = await professorService.findProfessorByCourseService(req.coursesId);
    res.send(professores)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}


export  {
  createProfessor,
  findAll,
  findByName,
  updateProfessor,
  deleteProfessor,
  findProfessorByCourse
}