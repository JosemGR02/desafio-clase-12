
const rutas = require('express').Router()
const rutaProductos = require('./user/producto.js')

rutas.use('/productos', rutaProductos)

module.exports = rutas
