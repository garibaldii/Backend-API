const express = require('express');
const router = require('express').Router();
const userController = require('../controller/user.controller')

router.use(express.json());

router.post('/create', userController.createUser);
router.get('/findAll', userController.findAllUsers);

module.exports = router;
