import { Router } from 'express';
const router = Router();

import {
    createUser,
    findAllUsers
} from '../controller/user.controller.js';

// Cria um novo usuário
router.post('/create', createUser);

//Busca todos os usuários cadastrados
router.get('/findAll', findAllUsers);

export default router;
