/*
    Rutas de Usuarios / Auth
    host + /api/auth    
*/

const { Router } = require('express');
const router = Router();

const { createUser, userLogin, renewToken } = require('../controllers/auth');

router.post('/new', createUser);

router.post('/', userLogin);

router.get('/renew', renewToken);

module.exports = router;