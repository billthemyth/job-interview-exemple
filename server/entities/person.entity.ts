export class PersonEntity {
    id              : string;
    name            : string;
    typeOfPerson    : string;
    
    constructor(id : string, name : string, typeOfPerson : "producer" | "tecnical" | "administrator"){
        this.id             = id;
        this.name           = name;
        this.typeOfPerson   = typeOfPerson;
    }
}