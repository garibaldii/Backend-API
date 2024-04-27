import mongoose from 'mongoose';

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
    required: true,
  },
  modalidade: {
    type: String,
    required: true,
    enum: ["Presencial", "EAD"]
  }
}) 

const curseModel = mongoose.model("Curso", CurseSchema);

export default curseModel;