
const socket = io('http://localhost:8080')

let usuarios = []
let mensajes = []
let productos = []


const productosForm = document.getElementById('formularioProds')
const aliasForm = document.getElementById('formularioAlias')
const mensajesForm = document.getElementById('formularioTxt')
const mostrar_chat = document.getElementById('mostrar_chat')
const contenedorProds = document.getElementById('productos')


//renders mensajeria

const obtenerNombreXidSocket = (socketId) => {
    const datosEncontrados = users.find( elemento => elemento.socketId === socketId )
    if(datosEncontrados === undefined)
        return 'Desconectado'
    if(!datosEncontrados.name)
        return datosEncontrados.socketId
    else return datosEncontrados.name
}
const limpiarChat = () => {
    mostrar_chat.innerHTML = ""
}
const renderizarMsj = ({msj, socketId, creadoEn}) => {
    const claseMsj = (socketId === socket.id) ? "chat__msg-own" : "chat__msg"
    const chatAutorContenido = (socketId === socket.id) ? "Yo" : getNameBySocketId(socketId)
    const chatMsj = document.createElement("div")
    const chatAutor = document.createElement("p")
    const chatfecha = document.createElement("p")
    chatMsj.classList.add(claseMsj)
    chatAutor.claseList.add('chat__owner')
    chatfecha.claseList.add('chat__date')
    chatAutor.innerHTML = chatAutorContenido
    chatfecha.innerHTML = creadoEn
    chatMsj.appendChild(chatAutor)
    chatMsj.innerHTML = chatMsj.innerHTML + msj
    chatMsj.appendChild(chatfecha)
    mostrar_chat.appendChild(chatMsj)
}

// renders productos

const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/assets/templates/producto.template')
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ productos })
    contenedorProds.innerHTML = html
}

// Listeners Productos

productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    crearProdFormulario.reset()
    socket.emit('nuevo producto', valoresFormulario)
})


// Listeners Mensajeria

aliasForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(aliasForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    socket.emit('cambiar el alias', String(valoresformulario.alias))
})

mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(textMsjForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    socket.emit('nuevo mensaje', valoresformulario.textMsj)
})

// Eventos mensajeria

socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    for (datosMsgs of todosMsgs){
        renderizarMsj(datosMsgs)
    }
    mostrar_chat.scrollTo(0, mostrar_chat.scrollHeight)
})

// Eventos Usuarios

socket.on('todos los usuarios', todosUsers => {
    usuarios = todosUsers
    limpiarChat()
    for (datosMsgs of mensajes){
        renderizarMsj(datosMsgs)
    }
    mostrar_chat.scrollTo(0, mostrar_chat.scrollHeight)
})


// Eventos Productos

socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    renderizarProds(todosProds)
})