
const Mensajes = require('../modelos/mensajes/msjModelo')
const Productos = require('../modelos/productos/prodModelo')
const Usuarios = require('../modelos/usuarios/userModelo')

const usuarioConectado = async (socket, io) => {
    console.log("Usuario conectado: ", socket.id)
    await Usuarios.guardar({ nombre: null, socketId: socket.id})
    const todosMsjs = await Mensajes.obtenerTodos()
    const todosUsers = await Usuarios.obtenerTodos()
    const todosProds = await Productos.obtenerTodos()

    // Envio a todos los sockets
    io.sockets.emit('todos los usuarios', todosUsers)
    io.sockets.emit('todos los mensajes', todosMsjs)
    socket.emit('todos los productos', todosProds)
}

const usuarioDesconectado = async (socket, io) => {
    const Usuarios = await Usuarios.getBySocketId(socket.id)
    if(usuario)
        await Usuarios.borrarXId(usuario.id)
    const todosUsers = await Usuarios.obtenerTodos()
    // Envio todos los usuarios a todos los sockets
    io.sockets.emit('todos los usuarios', todosUsers)
}

const usuarioCambioAlias = async (socket, io, alias) => {
    const usuario = await Usuarios.getBySocketId(socket.id)
    const userUpdated = {...usuario, nombre: alias}
    await Usuarios.actualizar(userUpdated, usuario.id)
    const todosUsers = await Usuarios.obtenerTodos()

    // Envio a todos los sockets
    io.sockets.emit('todos los usuarios', todosUsers)
}

module.exports = { usuarioConectado, usuarioDesconectado, usuarioCambioAlias }