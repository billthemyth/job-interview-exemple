import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
                private http : HttpClient 
              ) { }

  authenticate (login : string, password : string) : Observable<any> {
    return this.http.post(environment.urlApi + `/user/auth`, { login, password })
  }
  
}
