const usuarioService = require('../services/usuarioService');

const cadastrarUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuarioService.criarUsuario(req.body);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', error: error.message });
  }
};

module.exports = { cadastrarUsuario };
