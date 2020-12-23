import { PersonEntity } from    "../entities/person.entity";
import { v4 as uuidv4 } from    "uuid";

import {PersonController}    from    "./person.controller"


test('test if writeEntity and readEntity really works', async () => {

    const personController = new PersonController(); 
    const person           = new PersonEntity(undefined, "Julio", "Cesar", "456548684", "admin", undefined, undefined, undefined );
    
    personController.insert_entity(person,()=>{})
    personController.deactivate_entity( person.id ? person.id : "dasdoij" , ()=>{})

});