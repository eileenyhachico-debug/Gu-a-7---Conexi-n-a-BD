const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adso_db';
    await mongoose.connect(mongoURI);
    console.log('✓ Conexión exitosa a MongoDB via Mongoose');
    } catch (error) {
    console.error('✕ Error al conectar a MongoDB:', error.message);
    process.exit(1);
    }
};

module.exports = conectarBD;