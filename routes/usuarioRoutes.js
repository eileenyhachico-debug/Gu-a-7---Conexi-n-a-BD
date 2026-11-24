const router = require('express').Router();
const c = require('../controllers/usuarioController');

router.post('/registro', c.registrarUsuario);
router.post('/login', c.loginUsuario);
router.get('/', c.listarUsuarios);

module.exports = router;