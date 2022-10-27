
// Requires
const express = require('express');
const { Server: ServidorHttp } = require('http');
const { Server: ServidorIO } = require('socket.io');
const handlebars = require('express-handlebars');
const rutas = require('./rutas/index');


const { usuarioConectado, usuarioDesconectado, usuarioCambioAlias } = require('./handlers/usuario_hbs')
const { nuevoMensaje } = require('./handlers/mensaje_hbs')
const { nuevoProducto } = require('./handlers/producto_hbs')


const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static('./public'))


// IO
const servidorHttp = new ServidorHttp(app);
const io = new ServidorIO(servidorHttp);


//Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs"}));

app.set("view engine", "hbs");
app.set("views", "./views");


//Ruta
app.use('/api', rutas)


//Servidor
servidorHttp.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) })



// EVENTOS

//conexion usuarios
io.on('connection', socket => {
    usuarioConectado(socket, io)
})


// Evento disconnect 
socket.on('disconnect', reason => {
    console.log("reason", reason)
    usuarioDesconectado(socket, io)
})

// Evento nuevo mensaje
socket.on('nuevo mensaje', nuevoMsg => {
    nuevoMensaje(socket, io, nuevoMsg)
})

// Evento nuevo alias
socket.on('nuevo alias', nuevoAlias => {
    usuarioCambioAlias(socket, io, nuevoAlias)
})

// Evento nuevo producto 
socket.on('nuevo producto', nuevoProd => {
    nuevoProducto(socket, io, nuevoProd)
})




