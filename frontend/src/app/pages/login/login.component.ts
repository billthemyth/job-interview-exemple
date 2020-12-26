import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;

  constructor(
                private authenticationService : AuthenticationService,
                private formBuilder: FormBuilder,
                private cookieService         : CookieService,
                private router: Router
              ) { 
                  this.loginForm = this.formBuilder.group({
                                                            email   : ['', Validators.required],
                                                            password: ['', Validators.required]
                                                          })
                }

  ngOnInit(): void {

  }

  submit(){
    const {email, password} = this.loginForm.value
    this.authenticationService.authenticate(email, password)
    .subscribe((result) => {
                              if(result.status == 'FAIL' ) {
                                      this.router.navigate(['/login']);                        
                              } else {
                                      this.cookieService.set("user", email)
                                      this.cookieService.set("password", password)
                                      this.router.navigate(['/']);                        
                              }
                            })
 
  }

  

}
