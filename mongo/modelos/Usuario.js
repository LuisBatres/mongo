const mongoose = require('mongoose');
const Esquema = mongoose.Schema;

var esquemaNombre = new Esquema({
    nombre: String,
    apellido: String
});

// http:/​/​mongoosejs.​com/​docs/​validation.html

const EsquemaUsuario = new Esquema({
    nombre: {
        required: [true, 'Déjenos conocerlo agregando su nombre!'],
        type: String
    },
    email: {
        required: [true, 'Por favor agregue su email también'],
        type: String
    },
    edad: Number,
    telefono: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-d{4}/.test(v);
            },
            message: '{VALUE} no es un número de teléfono válido'
        }
    }
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);
module.exports = Usuario;

