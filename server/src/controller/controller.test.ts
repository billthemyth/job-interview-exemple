import  {   PersonEntity        }   from    "../entities/person.entity"
import  {   PersonController    }   from    "./person.controller"
import  {   PropertyEntity      }   from    "../entities/property.entity"
import  {   PropertyController  }   from    "./property.controller"
import  {   UserEntity          }   from    "../entities/user.entity"
import  {   UserController      }   from    "./user.controller"    

test('test all function in PersonController',  () => {

    const controller    = new PersonController(); 
    const entity        = new PersonEntity  ( 
                                            undefined,          "Julio",    "Cesar", 
                                            "any_cpf_number",   "admin",    undefined, 
                                            undefined,          undefined 
                                            );
    // Insert       (OK)
    // Deactivate   (OK)
    // Delete       (OK)
    // Update       (OK)  

    controller.insert_entity(entity,()=>{})

    expect(controller.select_entity().length).toEqual(1)
    expect(controller.select_entity()[0].name).toEqual("Julio")

    entity.name = "Jose"

    controller.deactivate_entity( entity.id ? entity.id : "any_invalid_id" , ()=>{})
    controller.update_entity( entity.id ? entity.id : "any_invalid_id" , entity , ()=>{})
    
    expect(controller.select_entity()[0].name).toEqual("Jose")    
    expect(controller.select_entity()[0].deactivated_at).not.toBeNull()
    expect(controller.select_entity()[0].name).toEqual(entity.name)

    controller.delete_entity(entity.id ? entity.id : "any_invalid_id", ()=>{})
});

test('test all function in PropertyController',  () => {

    const controller    = new PropertyController()
    const entity_person = new PersonEntity  ( 
                                                undefined,          "Julio",        "Cesar", 
                                                "any_cpf_number",   "admin",        undefined, 
                                                undefined,          undefined 
                                            )

    const entity        = new PropertyEntity(
                                                undefined,          entity_person,  "Bareu", 
                                                undefined,          undefined,      undefined
                                            )

    // Insert       (OK)
    // Deactivate   (OK)
    // Delete       (OK)
    // Update       (OK)  

    controller.insert_entity(entity,()=>{})

    expect(controller.select_entity().length).toEqual(1)
    expect(controller.select_entity()[0].name).toEqual("Bareu")

    entity.name = "Jose"

    controller.deactivate_entity( entity.id ? entity.id : "any_invalid_id" , ()=>{})
    controller.update_entity( entity.id ? entity.id : "any_invalid_id" , entity , ()=>{})

    expect(controller.select_entity()[0].name).toEqual("Jose")    
    expect(controller.select_entity()[0].deactivated_at).not.toBeNull()
    expect(controller.select_entity()[0].name).toEqual(entity.name)

    controller.delete_entity(entity.id ? entity.id : "any_invalid_id", ()=>{})
});

test('test all function in UserController',  () => {

    const controller    = new UserController()
    const entity_person = new PersonEntity  ( 
                                                undefined,          "Julio",        "Cesar", 
                                                "any_cpf_number",   "admin",        undefined, 
                                                undefined,          undefined 
                                            )

    const entity        = new UserEntity(
                                             undefined,             entity_person,  "julio@mail.com",
                                             "dj32ij423o",          undefined,      undefined, 
                                             undefined
                                        )

    // Insert       (OK)
    // Deactivate   (OK)
    // Delete       (OK)
    // Update       (OK)  

    controller.insert_entity(entity,()=>{})
    
    expect(controller.select_entity().length).toEqual(1)
    expect(controller.select_entity()[0].login).toEqual("julio@mail.com")

    entity.login = "jose@mail.com"

    controller.deactivate_entity( entity.id ? entity.id : "any_invalid_id" , ()=>{})
    controller.update_entity( entity.id ? entity.id : "any_invalid_id" , entity , ()=>{})
    
    expect(controller.select_entity()[0].login).toEqual("jose@mail.com")    
    expect(controller.select_entity()[0].deactivated_at).not.toBeNull()
    expect(controller.select_entity()[0].login).toEqual(entity.login)

    controller.delete_entity(entity.id ? entity.id : "any_invalid_id", ()=>{})
});