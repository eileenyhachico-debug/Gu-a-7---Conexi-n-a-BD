const mongoose = require('mongoose');
const Producto = require('../models/Producto');

const idValido = (id) => mongoose.isValidObjectId(id);

// 1. POST /api/productos
exports.crearProducto = async (req, res) => {
  try {
    const guardado = await new Producto(req.body).save();
    res.status(201).json({ status: 'OK', data: guardado });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 2. GET /api/productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ fechaCreacion: -1 });
    res.json({ status: 'OK', total: productos.length, data: productos });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 3. GET /api/productos/:id
exports.obtenerProductoPorId = async (req, res) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ message: 'ID inválido' });
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ status: 'OK', data: producto });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 4. PUT /api/productos/:id
exports.actualizarProducto = async (req, res) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ message: 'ID inválido' });
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actualizado) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ status: 'OK', data: actualizado });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 5. DELETE /api/productos/:id
exports.eliminarProducto = async (req, res) => {
    try {
    if (!idValido(req.params.id)) return res.status(400).json({ message: 'ID inválido' });
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'No existe el producto' });
    res.json({ status: 'OK', message: 'Producto eliminado con éxito' });
    } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
    }
};

// 6. GET /api/productos/categoria/:cat
exports.filtrarPorCategoria = async (req, res) => {
    try {
    const productos = await Producto.find({ categoria: req.params.cat });
    res.json({ status: 'OK', categoria: req.params.cat, data: productos });
    } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
    }
};