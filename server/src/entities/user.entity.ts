import  {   Entity              }   from "./entity"
import  {   PersonEntity        }   from "./person.entity"
import  {   PersonController    }   from "../controller/person.controller"

export class UserEntity extends Entity  {

    personID            : string
    person              : PersonEntity
    login               : string
    password            : string

    constructor(
                id              : string | undefined,   personID : string, 
                login           : string,               password : string, 
                created_at      : Date | undefined,     updated_at : Date | undefined, 
                deactivated_at  : Date | undefined
                ){
                    super(id, created_at, updated_at, deactivated_at)
                    
                    this.login              = login
                    this.password           = password
                    this.personID           = personID

                    const person_controller = new PersonController()

                    const person = person_controller.select_entity_one(this.personID)
                    
                    if(person.length == 0){
                        throw new Error("Person dont exists!")
                    }
                    
                    this.person = person[0]

                }
}