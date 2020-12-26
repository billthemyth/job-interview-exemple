import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor (
                private cookieService         : CookieService,
                private authenticationService : AuthenticationService,
                private router: Router
              ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      // this is a alternative options, obviously is recommended jwt default
      const user      = this.cookieService.get('user')
      const password  = this.cookieService.get('password')
      this.authenticationService.authenticate(user, password)
        .subscribe((result) => {
                                  if(result.status == 'FAIL' ) {
                                          this.router.navigate(['/login']);                        
                                  }
                                })
      observer.next(true)
    })
  }

}
