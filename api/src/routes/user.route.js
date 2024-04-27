import { Router } from 'express';
const router = Router();

import {
    createUser,
    findAllUsers
} from '../controller/user.controller.js';

import {
    ValidForm,
    ValidRegisteredUsers
} from '../middleware/user.middleware.js'

// Cria um novo usuário
router.post('/createUser', ValidForm, createUser);

//Busca todos os usuários cadastrados
router.get('/findAll', ValidRegisteredUsers, findAllUsers);

export default router;
