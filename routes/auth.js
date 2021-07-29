/*
    Rutas de Usuarios / Auth
    host + /api/auth    
*/

const { Router } = require('express');
const { body } = require('express-validator');

const { validateFields } = require('../middlewares/fields-validator');
const { createUser, userLogin, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
    '/new',
    [
        body('name', 'El nombre es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'Debe ser un email valido').isEmail(),
        body('password', 'La contresaña es obligatoria').notEmpty(),
        body('password', 'La contraseña debe tener por lo menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        body('email', 'El email es obligatorio').notEmpty(),
        body('email', 'Debe ser un email valido').isEmail(),
        body('password', 'La contresaña es obligatoria').notEmpty(),
        body('password', 'La contraseña debe tener por lo menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    userLogin
);

router.get('/renew', validateJWT ,renewToken);

module.exports = router;