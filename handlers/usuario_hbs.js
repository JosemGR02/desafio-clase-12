
// requires
const Mensajes = require('../modelos/mensajes/msjModelo')
const Productos = require('../modelos/productos/prodModelo')


const usuarioConectado = async (socket, io) => {
    console.log("Usuario conectado: ", socket)
    const todosMsjs = await Mensajes.obtenerTodos()
    const todosProds = await Productos.obtenerTodos()

    // Envio todo a todos
    io.sockets.emit('todos los mensajes', todosMsjs)
    io.sockets.emit('todos los productos', todosProds)
}


module.exports = { usuarioConectado }