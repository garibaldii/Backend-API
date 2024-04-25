const professorService = require('../services/professor.service');
// Cadastra professores - post('/createProfessor')
const createProfessor = async (req, res) => {
  try {
    const dadosProfessor = {
      ...req.infos,
      statusAtividade: "Ativo",
      observacoes: ""
    }

    const professor = await professorService.createService(dadosProfessor);

    if (!professor) {
      return res.status(400).send({message: "O professor não foi cadastrado"})
    }

    res.status(201).send({
      message: "O professor foi cadastrado com sucesso!",
      professor: {...dadosProfessor}
    })
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Busca todos os professores - get('/findAll')
const findAll = async (req, res) => {
  try {
    req.professors;
    res.send(professors)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }

}

// Busca os professores pelo nome - get('/nome/:nome')
const findByName = async (req, res) => {
  try {
    const nome = req.params.nome;

    const professores = await professorService.findByNameService(nome);

    if (!professores) {
      return res.status(400).send({message: "Não há professores cadastrados com esse nome"})
    }

    res.send(professores)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Atualiza dados de um professor pelo numero de matricula - put('/update/numero_de_matricula')
const updateProfessor = async (req, res) => {

  try {
    await professorService.updateService(req.infos);
    res.status(200).send({message: "Professor atualizado com sucesso!"})
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

// Buscar os professores pelos cursos selecionados - get('/cursos/:cursos')
const findProfessorByCurse = async (req, res) => {
  
  try {
    const professores = await professorService.findProfessorByCurseService(req.cursos);

    res.send(professores)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  createProfessor,
  findAll,
  findByName,
  updateProfessor,
  deleteProfessor,
  findProfessorByCurse
}