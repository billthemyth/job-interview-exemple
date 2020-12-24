import { Entity } from "./entity"

export class PersonEntity extends Entity {
    
    name            : string
    lastName        : string
    cpf             : string
    profile         : "producer" | "technician" | "administrator"

    constructor(
                id          : string|undefined, name            : string,
                lastName: string,               profile         : "producer"    | "technician"  | "administrator",
                cpf         : string,           created_at      : Date          | undefined, 
                updated_at  : Date | undefined, deactivated_at  : Date          | undefined 
                ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.name           = name
                    this.lastName       = lastName
                    this.cpf            = cpf
                    if( profile != "producer" && profile != "technician"  && profile != "administrator" ) throw new Error ("Profile inderteminated of forbbiden")
                    this.profile        = profile
                }
}