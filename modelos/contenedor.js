const fSync = require('fs')
const path = require('path')
const fs = fSync.promises

class Contenedor{
    constructor(archivoNombre) {
    try {
        this.archivoRuta = path.join(process.cwd(), `/db/${archivoNombre}.json`)
        fSync.writeFileSync(this.archivoRuta, '[]')
        } 
        catch (error) {
            console.log(`Error en el constructor: ${error.mensaje}`)
        }
    }
    
    async obtenerDatos(){
    try {
        const datos = await fs.readFile(this.archivoRuta,'utf-8')
        const datosArray = JSON.parse(datos)
        if(datosArray.length)
        return { nuevoId: datosArray.at(-1).id + 1, datos: datosArray }
        return { nuevoId: 1, datos: datosArray}
    } 
    catch (error) {
        console.log(`Error, no se pudo leer el archivo: ${error.mensaje}`)
        element
    }
    }

    async obtenerTodos() {
        try {
            const { datos } = await this.obtenerDatos()
            return datos
        }   
        catch (error) {
            console.log(`Error, no se pudo obtener todos los objetos: ${error.mensaje}`)
        }
        }

    async guardar(payload){
    try {
        const { nuevoId, datos } = await this.obtenerDatos()
        datos.push( {...payload, id: nuevoId} )
        await fs.writeFile(this.archivoRuta, JSON.stringify(datos, null, 2))
        
    } 
    catch (error) {
        console.log(`Error, no se pudo guardar el objeto: ${error.mensaje}`)
        
    }
    }
    
    async actualizar(payload, id) {
    try {
        const { datos } = await this.obtenerDatos()
        const indexEncontrado = datos.findIndex( elemento => elemento.id === Number(id))
        if( indexEncontrado === -1)
        throw new Error('Error, no se encontro el elemento ')
        datos.splice(indexEncontrado, 1, {...payload, id})
        await fs.writeFile(this.archivoRuta, JSON.stringify(datos, null, 2))

    } 
    catch (error) {
        console.log(`Error, no se pudo eliminar el objeto: ${error.mensaje}`)
    }
    }

    async obtenerXid(id) {
    try {
        const { datos } = await this.obtenerDatos()
        const datosEncontrados = datos.find( elemento => elemento.id === Number(id) )
        if(!datosEncontrados)
        throw new Error('Elemento no encontrado')
        return datosEncontrados
    } 
    catch (error) {
        console.log(`Error, no se pudo obtener el objeto requerido: ${error.mensaje}`)
    }
    }

    async borrarXid(id) {
    try {

        const { datos } = await this.obtenerDatos()
        const indexEncontrado = datos.findIndex( elemento => Number(elemento.id) === Number(id))
        if( indexEncontrado === -1)
        throw new Error('Elemento no encontrado')
        datos.splice(indexFound, 1)
        await fs.writeFile(this.archivoRuta, JSON.stringify(datos, null, 2))

    } 
    catch (error) {
        console.log(`Error, no se pudo eliminar un objeto: ${error.mensaje}`)
    }
    }

    async eliminarTodos(){
    try {
        await fs.writeFile(this.archivoRuta, '[]')
    } 
    catch (error) {
        console.log(`Error, no se pudo eliminar los objetos: ${error.mensaje}`)
    }
    }
}

module.exports = Contenedor