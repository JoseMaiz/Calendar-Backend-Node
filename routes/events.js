const {Router} = require('express');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvents, eventCreate, eventDelete, eventUptade } = require("../controllers/events");
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

/* 
    *Event Routes
    *host + /api/events
*/


const router = Router();

// ?Every EndPoint

// *Todas pasan por la validacion JWT por ende se una la aplicacion de un middleware que aplica para todo
router.use(validarJWT);

//* Obtener eventos 
router.get('/',[
    validarCampos,
],getEvents);

// *Crear un nuevo evento
router.post('/',[
    check('title','El titulo debe ser obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
],eventCreate);

// *Actualizar el evento
router.put('/:id',[
    check('title','El titulo debe ser obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
],eventUptade);

// *Borrar evento
router.delete('/:id',[
    validarCampos,
],eventDelete);


module.exports = router;
