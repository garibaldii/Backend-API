const Professor = require('../model/professorModel');
const professorModel = require('../model/professorModel');

const create =  (body) => Professor.create(body);

module.exports = {
    create,
}