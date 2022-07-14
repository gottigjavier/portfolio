import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { LoginService } from '../auth-sevices/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.loginService.authenticatedUser.token){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

  // you need implements CanActivateChilds (for childs routes)
  /* canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.loginService.authenticatedUser){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  } */
}
