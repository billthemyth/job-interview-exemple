import  {   Entity          }   from    "./entity"
import  {   PersonEntity    }   from    "./person.entity"

export class UserEntity extends Entity {
    person              : PersonEntity
    login               : string
    password            : string

    constructor(
                id              : string | undefined,   person : PersonEntity, 
                login           : string,               password : string, 
                created_at      : Date,                 updated_at : Date, 
                deactivated_at  : Date
                ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.person             = person
                    this.login              = login
                    this.password           = password
    }
}