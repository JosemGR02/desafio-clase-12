const Productos = require('../modelos/producto/prodModelo')

const nuevoProducto = async (socket, io, nuevoProd) => {
    await Productos.guardar(nuevoProd)
    const todosProductos = await Productos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProductos)
}


module.exports = { nuevoProducto }