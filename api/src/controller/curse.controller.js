import curseService from '../services/curse.service.js';

const createCurse = async (req, res) => {
    try{
        const curse = await curseService.createCurseService(req.infos);

        if (!curse) {
        return res.status(400).send({message: "O professor não foi cadastrado"})
        }

        res.status(201).send({
            message: "O curso foi cadastrado com sucesso!",
            curso: {curse}
        })
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
} 

const findAllCurses = async (req, res) => {
    try {
        res.send(req.curses)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deleteCurse = async (req, res) => {
    try {
        const deletedCurse = await curseService.deleteCurseService(req.codCurse)
        res.status(200).send({message: "O curso foi deletado com sucesso!", curso: deletedCurse})
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const updateCurse = async (req, res) => {
    try {
        const updatedCurse = await curseService.updateCurseService(req.infos)
        res.status(200).send({message: "Curso atualizado com sucesso!", curso: updatedCurse})
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
export  {
    createCurse,
    findAllCurses,
    deleteCurse,
    updateCurse
}