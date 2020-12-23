import { Entity } from "./entity"

export class PersonEntity extends Entity {
    
    name            : string
    lastName        : string
    cpf             : string
    perfil          : string

    constructor(
                id          : string|undefined, name            : string,           lastName: string,           
                cpf         : string,           perfil          : string,           created_at : Date|undefined, 
                updated_at  : Date | undefined, deactivated_at  : Date | undefined 
                ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.name           = name
                    this.lastName       = lastName
                    this.cpf            = cpf
                    this.perfil         = perfil
    }

}