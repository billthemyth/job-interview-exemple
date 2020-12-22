import  {   PersonEntity    }   from    './person.entity';

export class UserEntity {
    id                  : string;
    person              : PersonEntity;
    encryptedPassword   : string;
    jwtToken            : string;

    constructor(id : string, person : PersonEntity, encryptedPassword : string, jwtToken : string){
        this.id                 = id;
        this.person             = person;
        this.encryptedPassword  = encryptedPassword;
        this.jwtToken           = jwtToken;
    }
}