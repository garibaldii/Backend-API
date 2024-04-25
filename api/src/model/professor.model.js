const mongoose = require('mongoose')

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type:  String,
    required: true
  },
  matriculaId: {
    type: String,
    required: true,
    unique: true
  },
  unidadeId: {
    type: String,
    required: true,
  },
  titulacao: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  lattes: {
    type: String,
    required: true,
  },
  cursos: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  statusAtividade: {
    type: String,
    enum: ["Ativo", "Inativo"],
    required: true,
  },
  notes: {
    type: String,
  }
}) 

const professorModel = mongoose.model("Professor", ProfessorSchema);
module.exports = professorModel