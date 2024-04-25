const curseService = require('../services/curse.service');
const { findAll } = require('./professor.controller');

const createCurse = async (req, res) => {
    const curse = await professorService.createCurseService(req.infos);

    if (!curse) {
      return res.status(400).send({message: "O professor não foi cadastrado"})
    }

    res.status(201).send({
        message: "O curso foi cadastrado com sucesso!",
        curso: {...curse}
    })
} 

const findAllCurses = async (req, res) => {
    res.send(req.curses)
}

module.exports = {
    createCurse,
    findAllCurses
}