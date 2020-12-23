import  {   Entity          }   from    "./entity"
import  {   PersonEntity    }   from    "./person.entity"

export class PropertyEntity extends Entity {
    
    owner           : PersonEntity
    name            : string

   constructor(id        : string | undefined,    owner          : PersonEntity,     nome : string,                created_at     : Date, 
               updated_at: Date,                  deactivated_at : Date
               ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.owner  = owner
                    this.name   = nome
   }
}