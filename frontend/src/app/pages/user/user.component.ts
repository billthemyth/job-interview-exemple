import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from 'src/app/service/entity/person/person.service';
import { UserService } from 'src/app/service/entity/user/user.service';

interface UserInterface{ 
  id            : string          | undefined, 
  login         : string          | undefined,
  password      : string          | undefined,
  person        : PersonInterface | undefined
}

interface PersonInterface {
  id        : string  | undefined, 
  name      : string  | undefined, 
  lastName  : string  | undefined
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm    : FormGroup
  headers     : Array<string>         = [ 'Person', 'Login']
  users       : Array<UserInterface>= []
  people      : Array<PersonInterface> = []
  userGroup                           = {
                                          PersonID       : ['', Validators.required],
                                          Login        : ['', Validators.required],
                                          Password     : ['', Validators.required]

                                        }

  entityID : string                   = ""                                      


  stateOfPage = 'default'

  constructor (                
                private formBuilder     : FormBuilder,
                private userService     : UserService,
                private personService   : PersonService,
              ) { 
                  this.userForm       = this.formBuilder.group(this.userGroup)
                }
                
  ngOnInit(): void {}

  select_entity(){
    this.stateOfPage = this.stateOfPage=='list' ? 'default' : 'list'
    this.userService.select_entity().subscribe(res => this.users = res.result )
  }

  insert_entity(){
    this.personService.select_entity().subscribe( (res : { result : Array<any>}) => this.people = res.result )
    this.stateOfPage    = this.stateOfPage=='insert' ? 'default' : 'insert'
    if(this.userForm.valid) {
                              this.userService
                              .insert_entity({
                                                person_id : this.userForm.value.PersonID,
                                                login  : this.userForm.value.Login,
                                                password      : this.userForm.value.Password
                                                }).subscribe((sub_result)=>{
                                                                              if(sub_result.status == 'FAIL') alert(`FAIL : ${sub_result.message}`)
                                                                            })
                            } 
                            this.userForm = this.formBuilder.group(this.userGroup)

  }

  cancel_update(){
    this.stateOfPage = "default"
    this.userForm = this.formBuilder.group(this.userGroup)
  }

  update_entity(id? : string ){
    this.personService.select_entity().subscribe( (res : { result : Array<any>}) => this.people = res.result )
    if(id) {
              this.entityID = id
              this.userService
                .select_entity_one(id)
                .subscribe(res => {
                                    this.stateOfPage = "update"
                                    const userGroup = {
                                                        Login      : [res.result.login    , Validators.required],
                                                        PersonID   : [res.result.person_id, Validators.required],
                                                        Password   : [res.result.password, Validators.required]
                                                      }
                                                      this.userForm = this.formBuilder.group(userGroup)
                                  })

  } else  {
            if(this.userForm.valid) {
                                      console.log(this.userForm.value)
                                      this.userService
                                        .update_entity({
                                                          id        : this.entityID,
                                                          login      : this.userForm.value.login,
                                                          person_id  : this.userForm.value.PersonID,
                                                          password   : this.userForm.value.Password
                                                        }).subscribe((sub_result)=>{
                                                                                      console.log(sub_result)
                                                                                      if(sub_result.status == 'FAIL') alert(`FAIL : ${sub_result.message}`)
                                                                                      this.cancel_update()
                                                                                    })
                                                                                      
                                    }
          }

                                  }      
  deactivate_entity(){
    this.userService.deactivate_entity(this.entityID)
      .subscribe( () => { this.cancel_update()  });
  }   

}
