const userModel = require('../model/usuario.model');

const createUserService = async (dadosUsuario) => {
  try {
    const usuario = await userModel.create(dadosUsuario);
  } 
  catch (error) {
    throw new Error('Erro ao criar usuário');
  }
};

const findAllUsersService = () => userModel.find();

module.exports = { 
  createUserService,
  findAllUsersService,
};