const mongoose = require('mongoose')

const CurseSchema = new mongoose.Schema({
  nome: {
    type:  String,
    required: true,
    unique: true
  },
  codCurse: {
    type: String,
    required: true,
    unique: true
  },
  disciplinas : {
    type: [String],
    required: true
  },
  sigla: {
    type: String,
    required: true
  },
  cargaHoraria: {
    type: Number,
    require: true,
  },
  modalidade: {
    type: String,
    require: true,
    enum: ["Presencial", "EAD"]
  }
}) 

const curseModel = mongoose.model("Curso", CurseSchema);
module.exports = curseModel