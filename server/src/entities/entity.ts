import  {   v4 as uuidv4    }   from    "uuid"

export class Entity {
    id              : string    | undefined
    created_at      : Date
    updated_at      : Date
    deactivated_at  : Date      | undefined

    constructor( id : string | undefined, created_at : Date | undefined , updated_at : Date | undefined , deactivated_at : Date | undefined ){
        this.id             = id            ? id            : uuidv4() 
        this.created_at     = created_at    ? created_at    : new Date()
        this.updated_at     = updated_at    ? updated_at    : new Date() 
        this.deactivated_at = deactivated_at
    }
}