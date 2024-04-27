import bcrypt from 'bcrypt'
import { loginService, genereteToken } from '../services/auth.service.js'

const loginController = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await loginService(email);

        if(!user){
            return res.status(400).send({message: 'E-mail ou senha inválidas!'})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid){
            return res.status(400).send({message: 'E-mail ou senha inválidas!'})
        }

        const token = genereteToken(user.id, user.email)

        res.send('Logado! ✅');
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export {
    loginController,
}