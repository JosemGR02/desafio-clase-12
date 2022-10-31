
const rutas = require('express').Router()
const rutaProductos = require('./user/producto.js')
const rutaUsuarios = require('./user/usuario.js')

rutas.use('/productos', rutaProductos)
rutas.use('/usuarios', rutaUsuarios)

module.exports = rutas



