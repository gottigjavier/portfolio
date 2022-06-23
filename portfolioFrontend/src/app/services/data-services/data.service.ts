import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

// Servicio genérico usa el parámetro T
export class DataService<T> {

  private DOMAIN: string = environment.apiUrl; //Para incorporar variables de entorno
  private PORT: string = environment.apiPort;

  private url: string = `${this.DOMAIN}:${this.PORT}`;
  
  constructor(private http: HttpClient) { }

  public getAll<T>(endPoint: string): Observable<T>{  // En la llamada se especifica el tipo
    return this.http.get<T>(`${this.url}/${endPoint}`);
  }

  public getOne<T>(endPoint: string): Observable<T>{
    return this.http.get<T>(`${this.url}/${endPoint}`);
  }

  public create<T>(endPoint: string, data: T): Observable<any>{
    return this.http.post(`${this.url}/${endPoint}`, data);
  }

  public update<T>(endPoint: string, data: T): Observable<any>{
    return this.http.put(`${this.url}/${endPoint}`, data);
  }

  public delete(endPoint: string): Observable<any>{
    return this.http.delete<any>(`${this.url}/${endPoint}`);
  }
}
