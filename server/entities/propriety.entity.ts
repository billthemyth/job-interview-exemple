import  {   PersonEntity    }   from    "./person.entity";

export class PropertyEntity {
    id      : string;
    type    : string;
    owner   : PersonEntity;

    constructor(id : string, type : string, owner : PersonEntity) {
        this.id     = id;
        this.type   = type;
        this.owner  = owner;
    }
}