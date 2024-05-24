import userService from '../services/user.service.js';
//import { body, validationResult } from 'express-validator';

const ValidForm = (req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400).send({messege: 'É necessário preencher todos os campos!'})
    }

    req.infos = {username, email, password};

    next()
}

const ValidRegisteredUsers = async (req, res, next) => {
    try {
        const registeredUsers = await userService.findAllUsersService();

        if(!registeredUsers || registeredUsers.length == 0) {
            res.status(404).send({messege: 'Não há usuários cadastrados no banco de dados...'})
        }

        req.registeredUsers = registeredUsers;

        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
export {
    ValidForm,
    ValidRegisteredUsers
}