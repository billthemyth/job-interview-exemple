import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Entity {

  constructor(
                private httpClient : HttpClient
              ) { 
                  super(httpClient)
                  this.entityName = 'user'
                }
}