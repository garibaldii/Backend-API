/*const ProfessorController = {
    listarProfessores: async (req, res) => {
      try {
        const professores = await require('../models/professorModel').listarProfessores();
        res.status(200).json(professores);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao listar professores', error });
      }
    },
  
    obterProfessor: async (req, res) => {
      try {
        const { id } = req.params;
        const professor = await require('../models/professorModel').obterProfessor(id);
  
        if (!professor) {
          return res.status(404).json({ message: 'Professor não encontrado' });
        }
  
        res.status(200).json(professor);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professor', error });
      }
    },
  
    criarProfessor: async (req, res) => {
      try {
        const professor = await require('../models/professorModel').criarProfessor(req.body);
        res.status(201).json(professor);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao criar professor', error });
      }
    },
  
    atualizarProfessor: async (req, res) => {
      try {
        const { id } = req.params;
        const professorAtualizado = await require('../models/professorModel').atualizarProfessor(id, req.body);
  
        if (!professorAtualizado) {
          return res.status(404).json({ message: 'Professor não encontrado' });
        }
  
        res.status(200).json(professorAtualizado);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar professor', error });
      }
    },
  
    deletarProfessor: async (req, res) => {
      try {
        const { id } = req.params;
        await require('../models/professorModel').deletarProfessor(id);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar professor', error });
      }
    },
  };
  
  module.exports = {
    listarProfessores,
    obterProfessor,
    criarProfessor,
    atualizarProfessor,
    deletarProfessor,
  };*/
const professorService = require('../services/professorService');

  const create = async (req, res) => {
  const {nome, numero_matricula, cod_ue, titulacao, referencia, lates, curso, email, observacoes} = req.body;

  if (!nome || !numero_matricula || !cod_ue || !titulacao || !referencia || !lates || !curso || !email) {
    res.status(400).send({message: "Todos os campos precisam ser preenchidos"})
  }

  const professor = await professorService.create(req.body);
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

module.exports = { create }