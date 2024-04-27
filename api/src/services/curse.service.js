import curseModel from '../model/curse.model.js';

const createCurseService = (infos) => curseModel.create(infos);

const findAllCursesService = () => curseModel.find();

const findCurseByCodService = (codCurse) => curseModel.findOne({codCurse: codCurse});

const deleteCurseService = (codCurse) => curseModel.findOneAndDelete({codCurse: codCurse});

const updateCurseService = (infos) => {
    return curseModel.findOneAndUpdate(
    { codCurse: infos.codCurse }, infos,
    { new: true })
}
export default {
    createCurseService,
    findAllCursesService,
    findCurseByCodService,
    deleteCurseService,
    updateCurseService
}