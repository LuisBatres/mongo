var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var createError = require('http-errors');
// var Usuario = require('./modelos/Usuario');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/mongoexpress')
  .then(() => {
    console.log('Conexión realizada a MongoDB satisfactoriamente');
  })
  .catch(err => {
    console.error('Ocurrió un error: ', err.stack);
    process.exit(1);
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error de conexión con la base de datos'));
  db.once('open', function(callback) {
    console.log('Conexión exitosa con la base de datos');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
// app.set('json replacer', replacer);
// app.set('json spaces', 2);
app.use(express.static(path.join(__dirname, 'public')));

// Incluir controladores
fs.readdirSync('controladores').forEach(function(arch){
  // console.log(`Archivo: ${arch}\nExtensión: ${arch.slice(-3)}\nExtensión substr: ${arch.substr(-3)}`);
  if(arch.slice(-3) == '.js') {
    const ruta = require('./controladores/' + arch);
    ruta.controller(app);
  }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.get('/agregar', function (req, res) {
//   const recurso_usuario = new Usuario({
//     nombre: 'Juan Venado',
//     email: 'juan.venado@gmail.com',
//     edad: 52,
//   });

//   recurso_usuario.save()
//     .then((error) => {
//     if (error)
//         console.error(error);
//     else 
//         res.send({
//             success: true,
//             code: 200,
//             msg: '¡Usuario agregado!',
//         });
//   });
// });

// app.get('/todos', (req, res) => {
//   Usuario.find({}, 'nombre email')
//     .then( function (error, usuarios) {
//     if (error) { console.error(error) }
//     else {
//       res.send({
//         usuaios: usuarios
//       });
//     }
//   });
// });

// app.get('/findById/:id', (req, res) => {
//   Usuario.findById(req.id, 'nombre email')
//     .then((error, usuario) => {
//       if (error) { console.error(error); }
//       else {
//         res.send(usuario);
//       }
//     });
// });

// app.get('/findOneAndUpdate/:nombre/:nuevoNombre', (req, res) => {
//   Usuario.findOneAndUpdate({nombre: req.nombre}, {$set: {nombre: req.nuevoNombre}})
//     .then((err, usuario) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send(usuario);
//     });
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(3000, function() {
  console.log('Escuchando en el puerto 3000');
})
