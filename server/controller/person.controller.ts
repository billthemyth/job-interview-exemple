import  {   ControllerHandler   }   from    "./controller"

export class PersonController extends ControllerHandler {
    constructor(){
        super()
        this.entityName = "person"
    }
}