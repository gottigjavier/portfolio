import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  
  private logged: boolean= false;
  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser=this.loginService.authenticatedUser;
    if(currentUser && currentUser.token){
      req= req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      console.log("currentUser en Interceptor ", currentUser.token);
      this.logged=true;
    }
    console.log("Interceptor req ->>>> ", req);
    return next.handle(req);
  }

  userLogged(){
    return this.logged;
  }
}
