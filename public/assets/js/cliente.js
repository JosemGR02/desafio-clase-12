
const socket = io('http://localhost:8080')

let usuarios = []
let mensajes = []
let productos = []


// formularios
const productosForm = document.getElementById('formularioProds')
const mensajesForm = document.getElementById('formularioTxt')

// contenedores
const contenedorProds = document.getElementById('contenedorProductos')
const contenedorChat = document.getElementById('contenedorMensajes')


// render productos

const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/assets/templates/producto.template')
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({productos})
    contenedorProds.innerHTML = html
}

// render mensajeria

const limpiarChat = () => {
    contenedorChat.innerHTML = ""
}

const mensajesRenderizados = async (mensajes) => {
    let respuesta = await fetch('/assets/templates/mensajeria.template')
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({mensajes})
    contenedorChat.innerHTML = html
}


// LISTENERS

// Listeners Productos

productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    crearProdFormulario.reset()

    socket.emit('nuevo producto', valoresFormulario)
})


// Listeners Mensajeria
mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(mensajesForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    socket.emit('nuevo mensaje', valoresformulario.textMsj)
})


// EVENTOS

// Eventos mensajeria

socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    mensajesRenderizados(todosMsgs)
})

// Eventos Productos

socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    ProductosRenderizados(todosProds)
})