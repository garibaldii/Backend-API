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

const deleteCurse = async (req, res) => {
    await curseService.deleteCurseService(req.cod)

    res.status(200).send({message: "O curso foi deletado com sucesso!"})
}

const updateCurse = async (req, res) => {
    const updatedCurse = await curseService.updateCurseService(req.infos)
    res.status(200).send({message: "Professor atualizado com sucesso!", curso: updatedCurse})
}
module.exports = {
    createCurse,
    findAllCurses,
    deleteCurse,
    updateCurse
}