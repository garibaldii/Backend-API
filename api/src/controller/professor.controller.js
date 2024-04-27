import professorService from '../services/professor.service.js';

// Cadastra professores - post('/createProfessor')
const createProfessor = async (req, res) => {
  try {
    const dadosProfessor = {
      //corrijir para conseguir criar um professor que tenha observações
      ...req.infos,
      statusAtividade: "Ativo",
      observacoes: ""
    }

    const professor = await professorService.createProfessorService(dadosProfessor);

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
    const professors = req.professors;
    res.send(professors)
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

    res.send(professores)
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Atualiza dados de um professor pelo numero de matricula - put('/update/numero_de_matricula')
const updateProfessor = async (req, res) => {
  try {
    const updatedProfessor = await professorService.updateProfessorService(req.infos);
    res.status(200).send({message: "Professor atualizado com sucesso!", professor: updatedProfessor})
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

//MUDARA FORMA COM QUE SE BUSCA OS CURSOS
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

export  {
  createProfessor,
  findAll,
  findByName,
  updateProfessor,
  deleteProfessor,
  findProfessorByCurse
}