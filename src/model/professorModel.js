/*const mongoose = require('mongoose');
const professorModel = mongoose.model('Professor', professorSchema);

const professorSchema = new mongoose.Schema({
  nome: String,
  numero_matricula: String,
  cod_ue: String,
  titulacao: String,
  referencia: String,
  lates: String,
  curso: String,
  email: String,
  status: String
});

module.exports = {
  listarProfessores: async () => {
    return await professorModel.find().exec();
  },

  criarProfessor: async (data) => {
    const professor = new professorModel(data);
    return await professor.save();
  },

  obterProfessor: async (id) => {
    return await professorModel.findById(id).exec();
  },

  atualizarProfessor: async (id, data) => {
    return await professorModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  deletarProfessor: async (id) => {
    await professorModel.findByIdAndRemove(id).exec();
  }
};*/
const mongoose = require('mongoose')

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type:  String,
    required: true
  },
  numero_matricula: {
    type: String,
    required: true,
    unique: true
  },
  cod_ue: {
    type: String,
    required: true,
    unique: true
  },
  titulacao: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  lates: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  observacoes: {
    type: String,
    required: false,
  }
}) 

const Professor = mongoose.model("Professor", ProfessorSchema);

module.exports = Professor