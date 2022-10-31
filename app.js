
// Requires
const express = require('express');
const { Server: ServidorHttp } = require('http');
const { Server: ServidorIO } = require('socket.io');
const handlebars = require('express-handlebars');
const rutas = require('./rutas/index');


const Mensajes = require('./modelos/mensajes/msjModelo')
const Productos = require('./modelos/productos/prodModelo')
const Usuarios = require('./modelos/usuarios/userModelo')

// daysjs
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static('./public'))


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
        nuevoProducto(socket, io, nuevoProd)
    })

    socket.on('nuevo mensaje', nuevoMsg => {
        nuevoMensaje(socket, io, nuevoMsg)
    })

    socket.on('cambiar alias', alias => {
        cambiarAlias(socket, io, alias)
    })
})


// enviar todos
const enviarTodosProds = async (socket) =>{
    const todosProds = await Productos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) =>{
    const todosMsjs = await Mensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}



// nuevo mensaje

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("fecha formateada", fechaFormateada)
    await Mensajes.guardar({ msj: nuevoMsj, createDate: `${fechaFormateada} hs`})
    
    const todosMsjs = await Mensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}


// nuevo producto

const nuevoProducto = async (socket, io, nuevoProd) => {
    await Productos.guardar(nuevoProd)
    const todosProds = await Productos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}


