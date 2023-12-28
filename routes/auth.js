const {Router} = require('express');
const { userCreate, userLogin, tokenRevalidate } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

/* 
    *Rutas de Usuarios / Auth
    *host + /api/auth
*/

const router = Router();

//? Every EndPoint

// *Create new user
router.post(
    '/new',
    [ //middleware
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ],
    userCreate);

// * Login of the user
router.post(
    '/',
    [ //middleware
        check('email','El email es obligatorio').isEmail(),
        check('password','El password dene ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ], 
    userLogin);


// *Token revalidate and renew
router.get('/renew', validarJWT ,tokenRevalidate);

module.exports = router;