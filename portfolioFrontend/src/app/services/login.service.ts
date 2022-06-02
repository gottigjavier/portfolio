import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Servicio genérico usa el parámetro T
export class LoginService {

  private urlAuth: string = "http://localhost:8080/auth/login";
  
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
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
}
