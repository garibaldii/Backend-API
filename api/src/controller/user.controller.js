const userService = require('../services/user.service');

//Validações com express-validator
const { body, validationResult } = require('express-validator');

// Cria um novo usuário
const createUser = async (req, res) => {
  
  // Definindo as validações utilizando check ou body
  await body('email').isEmail().run(req);
  await body('password').isLength({min: 5}).run(req);

  // Capturando os resultados da validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ message: 'Erro de validação ❌', errors: errors.array() });
  }

  try {
    const newUser = await userService.createUserService(req.body);
    res.status(201).send({ message: 'Usuário cadastrado com sucesso', usuario: newUser });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};

// Lista todos os usuários
const findAllUsers = async (req, res) => {
  const users = await userService.findAllUsersService();

  if(!users) {
    return res.status(404).send('Não há usuários cadastrados')
  }

  res.status(200).json(users);
}

module.exports = { 
  createUser,
  findAllUsers,
};