
const socket = io('http://localhost:8080')

let usuarios = []
let mensajes = []
let productos = []


const productosForm = document.getElementById('formularioProds')
const aliasForm = document.getElementById('formularioAlias')
const mensajesForm = document.getElementById('formularioTxt')
const mostrar_chat = document.getElementById('mostrar_chat')
const seleccionProds = document.getElementById('productos')


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
    seleccionProds.innerHTML = ""
}
const renderProducts = async (productos) => {
    let respuesta = await fetch('/assets/templates/products.template.handlebars')
    const pantilla = await respuesta.text()
    const plantillaCompilada = Handlebars.compile(pantilla)
    const html = plantillaCompilada({ productos })
    seleccionProds.innerHTML = html
}

// Listeners Productos

productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new DatosForm(nuevoProducto)
    const valoresformulario = Object.fromEntries(datosFormulario)
    createProductForm.reset()
    socket.emit('nuevo producto', valoresformulario)
})


// Listeners Mensajeria

aliasForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new DatosForm(aliasForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    socket.emit('cambiar el alias', String(valoresformulario.alias))
})

mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new DatosForm(textMsjForm)
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