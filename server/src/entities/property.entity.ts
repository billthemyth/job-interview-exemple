import  {   Entity          }   from    "./entity"
import  {   PersonEntity    }   from    "./person.entity"

export class PropertyEntity extends Entity {
    
    owner           : PersonEntity
    name            : string

   constructor( id        : string | undefined,     owner          : PersonEntity,      name : string,
                created_at : Date|undefined,        updated_at  : Date | undefined,     deactivated_at  : Date | undefined ){
                    super(id, created_at, updated_at, deactivated_at)
                    this.owner  = owner
                    this.name   = name
                }
}