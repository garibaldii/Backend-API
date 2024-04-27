import userModel from '../model/user.model.js';

const createUserService = async (dadosUsuario) => {
  try {
    const usuario = await userModel.create(dadosUsuario);
  } 
  catch (error) {
    throw new Error('Erro ao criar usuário');
  }
};

const findAllUsersService = () => userModel.find();

export default { 
  createUserService,
  findAllUsersService,
};