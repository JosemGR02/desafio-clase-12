
// Requires
const express = require('express');
const { Server: ServidorHttp } = require('http');
const { Server: ServidorIO } = require('socket.io');
const rutas = require('./rutas/index')


const { usuarioConectado, usuarioDesconectado, usuarioCambioAlias } = require('./handlers/user.handler')
const { nuevoMensaje } = require('./handlers/mensaje_hbs.js')
const { nuevoProducto } = require('./handlers/mensaje_hbs.js')


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



//conexion usuarios
io.on('connection', socket => {
    usuarioConectado(socket, io)
})


//Rutas
app.use('/api', rutas)

//Servidor
httpServer.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) })



// EVENTOS

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




