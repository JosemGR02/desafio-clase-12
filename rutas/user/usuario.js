
const rutas = require('express').Router()
const Usuarios = require('../../modelos/usuarios/userModelos')

const obtenerTodosUsuarios = async (solicitud, respuesta, next) => {
    const usuarios = await Usuarios.obtenerTodos()
    respuesta.json({ datos: usuarios })
}

const obtenerUserXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const usuario = await Usuarios.obtenerXid(Number(id))
    respuesta.json({ datos: usuario })
}

const crearNuevoUser = async (solicitud, respuesta, next) => {
    const { nombre, socketId } = solicitud.body
    Usuarios.guardar({ nombre, socketId })
    respuesta.json({ datos: { nombre, socketId } })
}

const actualizarUserXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const { nombre, socketId } = solicitud.body
    Usuarios.actualizar({ nombre, socketId }, Number(id))
    respuesta.json({ datos: { nombre, socketId } })
}

const eliminarUserXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    Usuarios.borrarXid(Number(id))
    respuesta.json({ eliminado: true })
}

rutas.get('/', obtenerTodosUsuarios)

rutas.get('/:id', obtenerUserXid)

rutas.post('/', crearNuevoUser)

rutas.put('/:id', actualizarUserXid)

rutas.delete('/:id', eliminarUserXid)



module.exports = rutas