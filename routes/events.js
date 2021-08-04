/*
    Event Routes 
    /api/events
*/

const { Router } = require('express');
const { body } = require('express-validator');


const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/jwt-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        body('title', 'El titulo es obligatorio').notEmpty(),
        body('start', 'Fecha inicial es obligatoria').custom( isDate ),
        body('end', 'Fecha final es obligatoria').custom( isDate ),
        validateFields
    ],
    createEvent
);

router.put(
    '/:id',
    [
        body('title', 'El titulo es obligatorio').notEmpty(),
        body('start', 'Fecha inicial es obligatoria').custom( isDate ),
        body('end', 'Fecha final es obligatoria').custom( isDate ),
        validateFields
    ],
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;