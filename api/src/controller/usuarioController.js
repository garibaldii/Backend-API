const usuarioService = require('../services/usuarioService');

//Validações com express-validator
const { body, validationResult } = require('express-validator');

const cadastrarUsuario = async (req, res) => {
  
  // Definindo as validações utilizando check ou body
  await body('email').isEmail().run(req);
  await body('senha').isLength({min: 5}).run(req);

  // Capturando os resultados da validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ mensagem: 'Erro de validação ❌', errors: errors.array() });
  }

  try {
    const novoUsuario = await usuarioService.cadastrarUsuarioService(req.body);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', error: error.message });
  }
};

const listarUsuarios= async (req, res) => {
  const usuarios = await usuarioService.listarUsuariosService();

  if(!usuarios) {
    return res.status(404).send('Não há usuários cadastrados')
  }

  res.status(200).json(usuarios);
}

module.exports = { 
  cadastrarUsuario,
  listarUsuarios,
};