// Here can export for a messager
export default (msg: string, type = "default") => {
    const date          = new Date().getDate()
    const msg_complete  = `[${type}] [${date}] ⇾ ${msg}`
    handlerMessage(msg_complete)
}

function handlerMessage(msg: string){
    console.log(msg)
}