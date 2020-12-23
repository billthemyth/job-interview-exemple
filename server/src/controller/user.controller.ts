import  {   ControllerHandler   }   from    "./controller"

export class UserController extends ControllerHandler {
    constructor(){
        super()
        this.entityName = "user"
    }
}