import      fs                  from    "fs"
import  {   PersonEntity    }   from    "../entities/person.entity"
import  {   PropertyEntity  }   from    "../entities/property.entity"
import  {   UserEntity      }   from    "../entities/user.entity"


export class ControllerHandler {
    
    private rootPath            = "./controller/data/"
    private extensionFile       = ".json"
    protected entityName        = "entity"

    private get filePath () : string {
        return this.rootPath + this.entityName + this.extensionFile
    }

    public select_entity() : Array<PersonEntity|PropertyEntity|UserEntity> {
        return JSON.parse(fs.readFileSync( this.filePath , "utf8").toString())
    }

    public insert_entity( ent : PersonEntity|PropertyEntity|UserEntity, callback : Function){
        let entity : Array<PersonEntity|PropertyEntity|UserEntity>
        try {
            entity = this.select_entity()
        } catch (error) {
            entity = []
        }
        entity.push(ent)
        fs.writeFileSync(this.filePath, JSON.stringify(entity), callback())
    }

    // This function grant the id is unique
    private handle_unique_entity(id : string, fn : Function ){
        const entity    = this.select_entity()
        let filtered  = entity.filter(en => id == en.id )
        if(filtered.length == 0 ) {
            throw Error("id dont exists!")
        } else if (filtered.length == 1 ) {
            fn()
        } else {
            throw Error("id is not unique")
        }
    }

    public update_entity(id : string, ent : PersonEntity|PropertyEntity|UserEntity, callback : Function ){
        this.handle_unique_entity(id, ()=>{
            const entity    = this.select_entity()
            let filtered    = entity.filter( en => id != en.id )
            ent.id          = id
            filtered.push(ent)
            fs.writeFileSync(this.filePath, JSON.stringify(filtered), callback())
        })
    }

    delete_entity(id : string, callback : Function){
        this.handle_unique_entity(id,()=>{
            const entity    = this.select_entity()
            const filtered  = entity.filter( en => id != en.id )
            fs.writeFileSync(this.filePath, JSON.stringify(filtered), callback())
        })
    }

    deactivate_entity(id : string, callback : Function){
        this.handle_unique_entity(id,()=>{
            const entity                    = this.select_entity()
            const filtered                  = entity.filter( en => id != en.id )
            const specific_entity           = entity.filter( en => id == en.id )[0]
            specific_entity.deactivated_at  = new Date()
            filtered.push(specific_entity)
            fs.writeFileSync(this.filePath, JSON.stringify(filtered), callback())
        })
    }

}