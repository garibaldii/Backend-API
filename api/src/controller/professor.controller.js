import { associateProfessorToCourse, desassociateProfessorFromCourse } from '../controller/course.controller.js'
import professorService from '../services/professor.service.js';

// Cadastra professores - post('/')
const createProfessor = async (req, res) => {
  try {
    const professor = await professorService.createProfessorService(req.infos);

    if (!professor) {
      return res.status(400).send({message: "O professor não foi cadastrado"})
    }

    await associateProfessorToCourse(professor._id, professor.coursesId);

    res.status(201).send({
      message: "O professor foi cadastrado com sucesso!",
      professor: {professor}
    })
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Busca todos os professores - get('/')
const findAll = async (req, res) => {
  try {
    res.status(200).send(req.professors)
  }
  catch (err) {
    res.status(500).send({ message: `FindAllError ${err.message}`});
  }

}

// Busca os professores pelo nome - get(':nome')
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

//Atualiza dados de um professor pelo numero de matricula - put('/:id')
const updateProfessor = async (req, res) => {
  try {
    const professor = await professorService.findByIdService(req.id)
    desassociateProfessorFromCourse(req.id, professor.coursesId);

    const updatedProfessor = await professorService.updateProfessorService(req.infos);

    associateProfessorToCourse(updatedProfessor._id, updatedProfessor.coursesId);

    res.status(201).send({
      message: "O professor foi atualizado com sucesso!",
      professor: {updatedProfessor}
    })
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Deleta um professor da base de dados - delete('/:id')
const deleteProfessor = async (req, res) => {

  try {
    const deletedProfessor = await professorService.deleteProfessorService(req.id);
    
    if(await professorService.findByIdService(req.id)){
      res.status(400).send({message: 'Professor não deletado'})
    }
    
    await desassociateProfessorFromCourse(deletedProfessor.id, deletedProfessor.coursesId);
    
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