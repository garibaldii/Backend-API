import userModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';

const loginService = (email) => {
    try {
        userModel.findOne({ email: email }).select('+password')
    } catch (err) {
        return "Erro ao logar, problema no Banco de Dados"
    }

}

const genereteToken = (id, email) => {
    try {
        jwt.sign({id: id, email: email}, process.env.SECRET_JWT, {expiresIn: 86400});
    } catch (err) {
        return "Erro no Banco de Dados"
    }
}
export { loginService, genereteToken };