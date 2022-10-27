const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const Mensajes = require('../models/message/message.model')

dayjs.extend(customParseFormat)

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("nuevo mensaje ~ fecha formateada", fechaFormateada)
    await Mensajes.guardar({ msj: nuevoMsj, socketId: socket.id, createDate: `${fechaFormateada} hs`})
    const todosMsjs = await Mensajes.obtenerTodos()

  // Envio a todos los sockets
    io.sockets.emit('todos los mensajes', todosMsjs)
}


module.exports = { nuevoMensaje } 