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
  modalidade: {
    type: String,
    required: true,
    enum: ["Presencial", "EAD", "Híbrido"]
  },
  professors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor"
  }]
}) 

const curseModel = mongoose.model("Curse", CurseSchema);

export default curseModel;