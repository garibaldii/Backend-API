import curseService from '../services/curse.service.js';

const ValidForm = (req, res, next) => {
    try {
    const {nome, codCurse, disciplinas, sigla, modalidade} = req.body

    if(!nome || !codCurse || !disciplinas || !sigla || !modalidade) {
        res.status(400).send({message: 'Todos os campos precisam ser preechidos'})
    }

    req.infos = {nome, codCurse, disciplinas, sigla, modalidade}

    next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidSearchCurse = async (req, res, next) => {
    try {
        const curses = await curseService.findAllCursesService();

        if (!curses || curses.length === 0) {
        return res.status(400).send({message: "Não há cursos cadastrados"})
        }

        req.curses = curses;
        
        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidCodCurse = async (req, res, next) => {
    try {
        const codCurse = req.params.codCurse

        const curse = await curseService.findCurseByCodService(codCurse)

        if(!curse) {
            return res.status(400).send({message: "Curso não encontrado"})
        }

        req.curse = curse
        req.codCurse = codCurse

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const ValidUpdate = async (req, res, next) => {
    try {
        const {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade} = req.body

        if(!nome && !codCurse && !disciplinas && !sigla && !cargaHoraria && !modalidade) {
            res.status(400).send({message: 'Ao menos 1 campo precisa ser alterado'})
        }

        req.infos = {nome, codCurse, disciplinas, sigla, cargaHoraria, modalidade}

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export {
    ValidForm,
    ValidSearchCurse,
    ValidCodCurse,
    ValidUpdate
}