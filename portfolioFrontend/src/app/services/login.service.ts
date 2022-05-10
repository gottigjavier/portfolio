import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

// Servicio genérico usa el parámetro T
export class LoginService<T> {

  private urlUser: string = "http://localhost:8080/user";
  //private urlUser: string = "http://localhost:3003/user";

  constructor(private http: HttpClient) { }

  public getUser<T>(): Observable<T>{
    return this.http.get<T>(`${this.urlUser}/list`);
  }
}
