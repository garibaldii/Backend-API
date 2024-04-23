const Usuario = require('../model/usuarioModel');

const cadastrarUsuarioService = async (dadosUsuario) => {
  try {
    const usuario = await Usuario.create(dadosUsuario);
    return usuario;
  } catch (error) {
    throw new Error('Erro ao criar usuário');
  }
};

const listarUsuariosService = () => Usuario.find();

module.exports = { 
  cadastrarUsuarioService,
  listarUsuariosService,
};