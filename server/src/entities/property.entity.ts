import  {   Entity              }   from "./entity"
import  {   PersonEntity        }   from "./person.entity"
import  {   PersonController    }   from "../controller/person.controller"

export class PropertyEntity extends Entity {
    
    owner           : PersonEntity
    ownerID         : string
    name            : string

   constructor  (   id          : string| undefined,    name        : string,                   created_at  : Date  | undefined,    
                    updated_at  : Date | undefined,     deactivated_at  : Date | undefined,     ownerID     : string
                ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.ownerID  = ownerID

                    const person_controller = new PersonController()

                    const owner = person_controller.select_entity_one(this.ownerID)
                    
                    
                    if(owner.length == 0){
                        throw new Error("Person dont exists!")
                    }

                    if(owner[0].profile != 'producer' ){
                        throw new Error("Person should be a producer!")
                    }
                    
                    this.owner = owner[0]
                    
                    this.name   = name
                }
}