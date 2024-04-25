const curseModel = require("../model/curse.model");

const createCurseService = (infos) => curseModel.create(infos);

const findAllCursesService = () => curseModel.find();
module.exports = {
    createCurseService,
    findAllCursesService,
}