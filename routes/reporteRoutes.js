const router = require('express').Router();
const c = require('../controllers/reporteController');

router.get('/estadisticas', c.obtenerEstadisticas);

module.exports = router;