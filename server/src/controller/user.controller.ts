import  {   ControllerHandler   }   from    "./controller"

export class UserController extends ControllerHandler {
    constructor(){
        super()
        this.entityName = "user"
    }

    authenticate(login : string, password : string){
        const entities = this.select_entity().filter( en => en.login === login )
        console.log(entities)
        if(entities.length == 0) throw new Error(`No user found`)
        if(entities[0].password === password){
            return entities
        }
        return []
    }

}