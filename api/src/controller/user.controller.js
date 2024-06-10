import userService from '../services/user.service.js';

// Cria um novo usuário
const createUser = async (req, res) => {
  try {
    const usuarioCriado = await userService.createUserService(req.infos);
    res.status(201).send({ msg: 'Usuário cadastrado com sucesso'});
  } 
  catch (err) {
    res.status(500).send({ msg: 'Erro ao cadastrar usuário', err: err.message });
  }
};

// Lista todos os usuários
const findAllUsers = async (req, res) => {
  try {
    res.status(200).send(req.registeredUsers);
  }
  catch (err) {
    res.status(500).send({ msg: err.message });
  }
}

export { 
  createUser,
  findAllUsers,
}