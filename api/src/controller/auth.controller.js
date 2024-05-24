import bcrypt from 'bcrypt';
import { loginService, genereteToken } from '../services/auth.service.js';

const loginController = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await loginService(email);
        if (!user) {
            return res.status(400).send({ message: 'E-mail ou senha inválidas!' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ message: 'E-mail ou senha inválidas!' });
        }

        const token = genereteToken(user.id, user.email);

        console.log('Token gerado:', token);
        return res.status(200).send({ message: 'Logado! ✅', token });
    } catch (err) {
        console.error('Erro no servidor:', err.message);
        return res.status(500).send({ message: err.message });
    }
};

export { loginController };
