
const rutas = require('express').Router()
const Productos = require('../../modelos/producto/prodmModelo')


const obtenerTodosProds = async (solicitud, respuesta, next) => {
    const productos = await Productos.obtenerTodos()
    respuesta.json({ datos: productos })
}


const obtenerProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const producto = await Productos.obtenerXid(Number(id))
    respuesta.json({ datos: producto })
}

const crearNuevoProd = async (solicitud, respuesta, next) => {
    const { titulo, precio, imagen } = solicitud.body
    Productos.guardar({ titulo, precio, imagen })
    respuesta.json({ datos: { titulo, precio, imagen } })
}

const actualizarProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const { titulo, precio, imagen } = solicitud.body
    Productos.actualizar({ titulo, precio, imagen }, Number(id))
    respuesta.json({ datos: { titulo, precio, imagen } })
}

const eliminarProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    Productos.borrarXid(Number(id))
    respuesta.json({ eliminado: true })
}

rutas.get('/', obtenerTodosProds)

rutas.get('/:id', obtenerProdXid)

rutas.post('/', crearNuevoProd)

rutas.put('/:id', actualizarProdXid)

rutas.delete('/:id', eliminarProdXid)



module.exports = rutas









