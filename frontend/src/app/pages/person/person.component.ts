import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/service/entity/person/person.service';

interface PersonInterface{ 
                            id        : string | undefined, 
                            name      : string | undefined, 
                            lastName  : string | undefined, 
                            profile   : string | undefined, 
                            cpf       : string | undefined
                          }

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {
  
  userForm    : FormGroup
  headers     : Array<string>         = [ 'CPF', 'name', 'lastName', 'profile']
  people      : Array<PersonInterface>= []
  userGroup                           = {
                                          CPF       : ['', Validators.required],
                                          Name      : ['', Validators.required],
                                          LastName  : ['', Validators.required],
                                          Profile   : ['', Validators.required]
                                        }
  entityID : string                   = ""                                      
  account : any 

  stateOfPage = 'default'

  constructor (                
                private formBuilder   : FormBuilder,
                private personService : PersonService,
                private router        : Router
              ) { 
                  this.userForm       = this.formBuilder.group(this.userGroup)
                  this.account_entity()
                }
                
  ngOnInit(): void {}

  account_entity(){
    this.personService.select_entity().subscribe( (res : {result : Array<any> }) => {
                                                          this.account =  {
                                                              technician     : res.result.filter((people)=> people.profile == 'technician').length,
                                                              producer       : res.result.filter((people)=> people.profile == 'producer').length,
                                                              administrator  : res.result.filter((people)=> people.profile == 'administrator').length
                                                          }
                                                        } )

                    
  }

  select_entity(){
    this.stateOfPage = this.stateOfPage=='list' ? 'default' : 'list'
    this.personService.select_entity().subscribe(res => this.people = res.result )
  }

  insert_entity(){
    this.stateOfPage    = this.stateOfPage=='insert' ? 'default' : 'insert'
    if(this.userForm.valid) {
                              this.personService
                              .insert_entity({
                                                name      : this.userForm.value.Name,
                                                lastName  : this.userForm.value.LastName,
                                                cpf       : this.userForm.value.CPF,
                                                profile   : this.userForm.value.Profile
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
    if(id) {
              this.entityID = id
              this.personService
                .select_entity_one(id)
                .subscribe(res => {
                                    this.stateOfPage = "update"
                                    const userGroup = {
                                                        Name      : [res.result.name, Validators.required],
                                                        LastName  : [res.result.lastName, Validators.required] , 
                                                        CPF       : [res.result.cpf, Validators.required]   ,    
                                                        Profile   : [res.result.profile, Validators.required]   
                                                      }
                                                      this.userForm = this.formBuilder.group(userGroup)
                                  })

  } else  {
            if(this.userForm.valid) {
                                      this.personService
                                        .update_entity({
                                                          id        : this.entityID,
                                                          name      : this.userForm.value.Name,
                                                          lastName  : this.userForm.value.LastName,
                                                          cpf       : this.userForm.value.CPF,
                                                          profile   : this.userForm.value.Profile
                                                        }).subscribe((sub_result)=>{
                                                                                      console.log(sub_result)
                                                                                      if(sub_result.status == 'FAIL') alert(`FAIL : ${sub_result.message}`)
                                                                                      this.cancel_update()
                                                                                    })
                                                                                      
                                    }
          }

                                  }      
  deactivate_entity(){
    this.personService.deactivate_entity(this.entityID)
      .subscribe( () => { this.cancel_update()  });
  }           
}
