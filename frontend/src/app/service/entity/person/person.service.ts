import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity     } from 'src/app/service/entity/entity'
@Injectable({
  providedIn: 'root'
})
export class PersonService extends Entity {

  constructor(
                private httpClient : HttpClient
              ) { 
                  super(httpClient)
                  this.entityName = 'person'
                }
}
