const curseModel = require('../model/curse.model');

const findCurseByName = (cursos) => curseModel.find({nome: { $in: cursos }});
