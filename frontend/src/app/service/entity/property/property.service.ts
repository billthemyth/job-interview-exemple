import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends Entity {

  constructor(
                private httpClient : HttpClient
              ) { 
                  super(httpClient)
                  this.entityName = 'property'
                }
}
