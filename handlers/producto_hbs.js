const Productos = require('../modelos/productos/prodModelo')


const nuevoProducto = async (socket, io, nuevoProd) => {
    await Productos.guardar(nuevoProd)
    const todosProds = await Productos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}


module.exports = { nuevoProducto }