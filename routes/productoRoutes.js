const router = require('express').Router();
const c = require('../controllers/productoController');

router.post('/', c.crearProducto);
router.get('/', c.obtenerProductos);
router.get('/categoria/:cat', c.filtrarPorCategoria);
router.get('/:id', c.obtenerProductoPorId);
router.put('/:id', c.actualizarProducto);
router.delete('/:id', c.eliminarProducto);

module.exports = router;