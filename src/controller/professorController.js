const professorService = require('../services/professorService');
const mongoose = require('mongoose');

const cadastrarProfessor = async (req, res) => {
  const {nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes} = req.body;

  if (!nome || !numero_matricula || !cod_ue || !titulacao || !referencia || !lates || !curso || !email) {
    res.status(400).send({message: "Todos os campos precisam ser preenchidos"})
  }

  const professor = await professorService.cadastrarProfessorService(req.body);
  if (!professor) {
    return res.status(400).send({message: "O professor não foi cadastrado"})
  }

  res.status(201).send({
    message: "O professor foi cadastrado com sucesso!",
    professor: {
      id: professor._id,
      nome,
      numero_matricula,
      cod_ue,
      titulacao,
      referencia,
      lates,
      curso,
      email,
      observacoes
    }
  })
}

const buscarTodosProfessores = async (req, res) => {
  const professores = await professorService.listarProfessoresService();

  if (professores.length === 0) {
    return res.statu(400).send({message: "Não há professores cadastrados"})
  }

  res.send(professores)
}

const buscarProfessoresNome = async (req, res) => {
  const nome = req.params.nome;

  const professores = await professorService.buscarProfessoresNomeService(nome);

  if (!professores) {
    return res.status(400).send({message: "Não há professores cadastrados com esse nome"})
  }

  res.send(professores);
}

const atualizarProfesor = async (req, res) => {
  const {nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes} = req.body;

  if (!nome && !numero_matricula && !cod_ue && !titulacao && !referencia && !lates && !curso && !email) {
    res.status(400).send({message: "Pelo menos 1 campo precisa ser atualizado"})
  }

  const numeroMatricula = req.params.numero_matricula;

  const professorBuscado = await professorService.buscaProfessorPorNumeroMatriculaService(numeroMatricula);

  if (!professorBuscado) {
    return res.status(404).send({message: "Não há professor com esse número de matrícula"})
  }

  const professor = await professorService.atualizarProfessorService(
    nome,
    numero_matricula,
    cod_ue,
    titulacao,
    referencia,
    lates,
    curso,
    email,
    observacoes
  );

  res.status(200).send({message: "Professor atualizado com sucesso!"})

}

const removeProfessor = async (req, res) => {
  const numeroMatricula = req.params.numero_matricula;

  const professorBuscado = await professorService.buscaProfessorPorNumeroMatriculaService(numeroMatricula);
  
  if (!professorBuscado) {
    return res.status(404).send({message: "Não há professor com esse número de matrícula"})
  }

  const professor = await professorService.removeProfessorService(numeroMatricula);

  res.status(200).send({message: "Professor removido com sucesso!"})
}

module.exports = {
  cadastrarProfessor,
  buscarTodosProfessores,
  buscarProfessoresNome,
  atualizarProfesor,
  removeProfessor,
}