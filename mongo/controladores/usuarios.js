var Usuario = require('../modelos/Usuario');
module.exports.controller = (app) => {
    // Obtener todos los usuarios
    app.get('/usuarios', (req, res) => {
        // res.render('index', { title: 'Usuarios' });
        Usuario.find({}, 'nombre email').then((error, usuarios) => {
                if (error) { console.log(error); res.send(error); }
                res.end(usuarios);
            });
    });

    // Obtener un solo usuario
    app.get('/usuarios/:id', (req, res) => {
        Usuario.findById(req.params.id, 'nombre email')
            .then((error, usuario) => {
                if (error) {
                    console.error(error);
                    res.send(error);
                }
                else {
                    res.end(usuario);
                }
            });
    });

    // Agregar un nuevo usuario
    app.post('/usuarios', (req, res) => {
        const usuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email
        });

        usuario.save()
            .then(function(error, usuario) {
            if (error) {
                console.error(error);
                res.send(error);
            }
            else
                res.end(usuario);
        });
    });

    // Modificar un usuario
    app.put('/usuarios/:id', (req, res) => {
        Usuario.findById(req.params.id, 'nombre email')
            .then(function(error, usuario) {
                if (error) {
                    console.error(error);
                    res.send(error);
                }
                else {
                    usuario.nombre.nombre = req.body.nombre.nombre;
                    usuario.nombre.apellido = req.body.nombre.apellido;
                    usuario.save()
                        .then(function (error, usuario){
                            if (error) {
                                console.log(error);
                                res.send(error);
                            }
                            else
                                res.end(usuario);
                        });
                }
            });
    });

    // Eliminar un usuario
    app.delete('/usuarios/:id', (req, res) => {
        Usuario.deleteOne({_id: req.params.id})
            .then((error, usuario) => {
            if (error) {
                console.error(error);
                res.send(error);
            }
            else 
                res.end({ estado: eliminado });
        });
    });
}