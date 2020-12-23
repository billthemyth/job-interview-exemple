// Here can export for a messager
export default (msg: string, type = "default") => {
    const date          = new Date().toDateString()
    const msg_complete  = `[${type}] [${date}] ⇾  ${msg}`
    handlerMessage(msg_complete)
}

function handlerMessage(msg: string){
    console.log(msg)
}