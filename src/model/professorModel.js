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