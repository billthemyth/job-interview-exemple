import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/service/entity/person/person.service';
import { PropertyService } from 'src/app/service/entity/property/property.service';

interface PropertyInterface{ 
  id        : string                  | undefined, 
  name      : string                  | undefined, 
  owner     : OwnerProducerInterface  | undefined
}

interface OwnerProducerInterface {
  id        : string  | undefined, 
  name      : string  | undefined, 
  lastName  : string  | undefined
}

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  userForm    : FormGroup
  headers     : Array<string>         = [ 'Owner', 'name']
  properties  : Array<PropertyInterface>= []
  ownersProducer : Array<OwnerProducerInterface> = []
  userGroup                           = {
                                          OwnerID       : ['', Validators.required],
                                          Name          : ['', Validators.required]
                                        }

  entityID : string                   = ""                                      


  stateOfPage = 'default'

  constructor (                
                private formBuilder     : FormBuilder,
                private propertyService : PropertyService,
                private personService   : PersonService,
                private router          : Router
              ) { 
                  this.userForm       = this.formBuilder.group(this.userGroup)
                }
                
  ngOnInit(): void {}

  select_entity(){
    this.stateOfPage = this.stateOfPage=='list' ? 'default' : 'list'
    this.propertyService.select_entity().subscribe(res => this.properties = res.result )
  }

  insert_entity(){
    this.personService.select_entity().subscribe( (res : { result : Array<any>}) => this.ownersProducer = res.result.filter( en => en.profile == 'producer' ))
    this.stateOfPage    = this.stateOfPage=='insert' ? 'default' : 'insert'
    if(this.userForm.valid) {
                              this.propertyService
                              .insert_entity({
                                                owner_id  : this.userForm.value.OwnerID,
                                                name      : this.userForm.value.Name,
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
    this.personService.select_entity().subscribe( (res : { result : Array<any>}) => this.ownersProducer = res.result.filter( en => en.profile == 'producer' ))
    if(id) {
              this.entityID = id
              this.propertyService
                .select_entity_one(id)
                .subscribe(res => {
                                    this.stateOfPage = "update"
                                    const userGroup = {
                                                        Name      : [res.result.name    , Validators.required],
                                                        OwnerID   : [res.result.owner_id, Validators.required] 
                                                      }
                                                      this.userForm = this.formBuilder.group(userGroup)
                                  })

  } else  {
            if(this.userForm.valid) {
                                      this.propertyService
                                        .update_entity({
                                                          id        : this.entityID,
                                                          name      : this.userForm.value.Name,
                                                          owner_id  : this.userForm.value.OwnerID
                                                        }).subscribe((sub_result)=>{
                                                                                      console.log(sub_result)
                                                                                      if(sub_result.status == 'FAIL') alert(`FAIL : ${sub_result.message}`)
                                                                                      this.cancel_update()
                                                                                    })
                                                                                      
                                    }
          }

                                  }      
  deactivate_entity(){
    this.propertyService.deactivate_entity(this.entityID)
      .subscribe( () => { this.cancel_update()  });
  }   

}
