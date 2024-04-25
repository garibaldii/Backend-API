//const curseService = require('../services/curse.service')

const ValidForm = async (req, res, next) => {
    const {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade} = req.body

    if(!nome || !codCurse || !disciplinas || !sigla || !cargaHoraria || !modalidade) {
        res.status(400).send({message: 'Todos os campos precisam ser preechidos'})
    }

    req.infos = {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade}

    next()
}

const ValidSearchCurse = async (req, res, next) => {
    const curses = await professorService.findAllCursesService();

    if (!curses || curses.length === 0) {
      return res.statu(400).send({message: "Não há cursos cadastrados"})
    }

    req.curses = curses;
    
    next()
}
module.exports = {
    ValidForm,
    ValidSearchCurse,
}