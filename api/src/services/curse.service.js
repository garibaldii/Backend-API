const curseModel = require("../model/curse.model");

const createCurseService = (infos) => curseModel.create(infos);

const findAllCursesService = () => curseModel.find();

const findCurseByCodService = (codCurse) => curseModel.findOne({codCurse: codCurse});

const deleteCurseService = (codCurse) => curseModel.findOneAndDelete({codCurse: codCurse});

const updateCurseService = (infos) => {
    return curseModel.findOneAndUpdate(
    { codCurse: infos.codCurse }, infos,
    { new: true })
}
module.exports = {
    createCurseService,
    findAllCursesService,
    findCurseByCodService,
    deleteCurseService,
    updateCurseService
}