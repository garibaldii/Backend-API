import userService from '../services/user.service.js';
//import { body, validationResult } from 'express-validator';

// Cria um novo usuário
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUserService(req.infos);
    res.status(201).send({ message: 'Usuário cadastrado com sucesso', usuario: newUser });
  } 
  catch (err) {
    res.status(500).send({ message: 'Erro ao cadastrar usuário', err: err.message });
  }
};

// Lista todos os usuários
const findAllUsers = async (req, res) => {
  try {
    res.status(200).send(req.registeredUsers);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export { 
  createUser,
  findAllUsers,
}