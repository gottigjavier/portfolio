import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

// Servicio genérico usa el parámetro T
export class LoginService {

  private DOMAIN: string = environment.apiUrl; //Para incorporar variables de entorno
  private PORT: string = environment.apiPort;

  private urlAuth: string = `${this.DOMAIN}/auth/login`;
  
  currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
  }

  public login(data: any): Observable<any>{
    return this.http.post(`${this.urlAuth}`, data).pipe(map(resp =>{
      sessionStorage.setItem('currentUser', JSON.stringify(resp));
      this.currentUserSubject.next(resp);
      return resp;
    }));
  }

  get authenticatedUser(){
    return this.currentUserSubject.value;
  }

  public logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
    return false;
}
}
