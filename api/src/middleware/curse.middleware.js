const curseService = require('../services/curse.service')

const ValidForm = (req, res, next) => {
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

const ValidCodCurse = async (req, res, next) => {
    const {codCurse} = req.params.codCurse

    const curse = await curseService.findCurseByCodService(codCurse)

    if(!curse) {
        return res.status(400).send({message: "Curso não encontrado"})
    }

    req.curse = curse
    req.codCurse = codCurse

    next()
}

const ValidUpdate = async (req, res, next) => {
    const {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade} = req.body

    if(!nome && !codCurse && !disciplinas && !sigla && !cargaHoraria && !modalidade) {
        res.status(400).send({message: 'Ao menos 1 campo precisa ser alterado'})
    }

    req.infos = {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade}

    next()
}
module.exports = {
    ValidForm,
    ValidSearchCurse,
    ValidCodCurse,
    ValidUpdate
}