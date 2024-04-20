const Usuario = require('../model/usuarioModel');

const criarUsuario = async (dadosUsuario) => {
  try {
    const usuario = await Usuario.create(dadosUsuario);
    return usuario;
  } catch (error) {
    throw new Error('Erro ao criar usuário');
  }
};

module.exports = { criarUsuario };
