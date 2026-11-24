const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = async (req, res) => {
    try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    if (await Usuario.findOne({ email })) {
        return res.status(409).json({ message: 'El email ya está registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    await Usuario.create({ nombre, email, password: hash });
    res.status(201).json({ status: 'OK', message: 'Usuario registrado exitosamente' });
    } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
    }
};

// 8. POST /api/usuarios/login
exports.loginUsuario = async (req, res) => {
    try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ status: 'OK', token, usuario: { email: usuario.email } });
    } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
    }
};

// 9. GET /api/usuarios
exports.listarUsuarios = async (req, res) => {
    try {
    const usuarios = await Usuario.find({}, '-password'); // excluye la clave
    res.json({ status: 'OK', data: usuarios });
    } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
    }
};