import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlUsers: string = "http://localhost:3003/user";

  constructor(private http: HttpClient) { }

  public getUser(): Observable<any>{
    return this.http.get<any>(this.urlUsers);
  }
}
