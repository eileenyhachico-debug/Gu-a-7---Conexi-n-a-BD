const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
    precio: { type: Number, required: true, min: [0, 'El precio debe ser positivo'] },
    categoria: { type: String, required: true },
    stock: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', ProductoSchema);