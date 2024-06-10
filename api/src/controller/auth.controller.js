import bcrypt from 'bcrypt';
import { loginService, genereteToken } from '../services/auth.service.js';

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginService(email);
        if (!user) {
            return res.status(400).send({ msg: 'E-mail ou senha inválidas!' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ msg: 'E-mail ou senha inválidas!' });
        }

        const token = genereteToken(user.id, user.email);

        return res.status(200).send({ msg: 'Logado! ✅', token });
    } catch (err) {
        console.error('Erro no servidor:', err.message);
        return res.status(500).send({ msg: err.message });
    }
};

export { loginController };
