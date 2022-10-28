
// Requires
const express = require('express');
const { Server: ServidorHttp } = require('http');
const { Server: ServidorIO } = require('socket.io');
const handlebars = require('express-handlebars');
const rutas = require('./rutas/index');


const { nuevoMensaje } = require('./handlers/mensaje_hbs')
const { nuevoProducto } = require('./handlers/producto_hbs')

const Mensajes = require('./modelos/mensajes/msjModelo')
const Productos = require('./modelos/productos/prodModelo')



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

// conexion usuarios

io.on('connection', socket => {
    console.log('usuario conectado');
    enviarTodosProds()
    enviarTodosMsjs()

    socket.on('nuevo producto', nuevoProd => {
        nuevoProducto(nuevoProd)
    })

    socket.on('nuevo mensaje', nuevoMsg => {
        nuevoMensaje(nuevoMsg)
    })
})



const enviarTodosProds = async (socket) =>{
    const todosProds = await Productos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) =>{
    const todosMsjs = await Mensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}

