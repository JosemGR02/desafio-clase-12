const Contenedor = require('../../modelos/contenedor')

class ContenedorUsuarios extends Contenedor {
constructor (archivo) {
    super(archivo)
}
async getBySocketId(socketId) {
    try {
    const { datos } = await this.obtenerDatos()
    const datosEncontrados = datos.find( elemento => elemento.socketId === socketId )
    if(!datosEncontrados)
        throw new Error('Elemento no encontrado')
    return datosEncontrados
    } catch (error) {
    console.log(`Error al obtener un usuario por su socketId: ${error.mensajes}`)
    }
}
}

const Usuarios = new ContenedorUsuarios('Usuarios')

module.exports = Usuarios