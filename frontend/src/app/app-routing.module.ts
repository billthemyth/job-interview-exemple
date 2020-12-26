import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountantComponent } from './pages/accountant/accountant.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonComponent } from './pages/person/person.component';
import { PropertyComponent } from './pages/property/property.component';
import { UserComponent } from './pages/user/user.component';
import { GuardService } from './service/guard/guard.service';

const routes: Routes = [
                          {
                            path        :  "",
                            component   : HomepageComponent,
                            canActivate : [GuardService]

                          },
                          {
                            path        : "login",
                            component   : LoginComponent

                          },
                          {
                            path        : "user",
                            component   : UserComponent,
                            canActivate : [GuardService]

                          },
                          {
                            path        : "property",
                            component   : PropertyComponent,
                            canActivate : [GuardService]

                          },
                          {
                            path        : "person",
                            component   : PersonComponent,
                            canActivate : [GuardService]

                          },
                          {
                            path        : "accountant",
                            component   : AccountantComponent,
                            canActivate : [GuardService]

                          }
                        ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
