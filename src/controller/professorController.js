const professorService = require('../services/professorService');

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

module.exports = {
  cadastrarProfessor,
  buscarTodosProfessores
}