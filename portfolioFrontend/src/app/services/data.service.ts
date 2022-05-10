import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

// Servicio genérico usa el parámetro T
export class DataService<T> {

  /* private urlUser: string = "http://localhost:3003/user";
  private urlAbout: string = "http://localhost:3003/about";
  private urlExperience: string = "http://localhost:3003/experience";
  private urlEducation: string = "http://localhost:3003/education";
  private urlSkills: string = "http://localhost:3003/skills";
  private urlTecnologies: string = "http://localhost:3003/tecnologies";
  private urlProjects: string = "http://localhost:3003/projects";
  private urlLanguages: string = "http://localhost:3003/languages";
 */

  private DOMAIN: string = "http://localhost";
  private PORT: string = "8080";

  // ¿se podrá encontrar la forma de infresar el endPoint (/user, /about) como parámetro
  // y así hacer el data service genérico?
  private urlUser: string = `${this.DOMAIN}:${this.PORT}/user`;
  private urlAbout: string = `${this.DOMAIN}:${this.PORT}/about`;
  private urlExperience: string = `${this.DOMAIN}:${this.PORT}/job-experience`;
  private urlEducation: string = `${this.DOMAIN}:${this.PORT}/education`;
  private urlSkills: string = `${this.DOMAIN}:${this.PORT}/skill`;
  private urlTecnologies: string = `${this.DOMAIN}:${this.PORT}/technology`;
  private urlProjects: string = `${this.DOMAIN}:${this.PORT}/my-project`;
  private urlLanguages: string = `${this.DOMAIN}:${this.PORT}/spoken-language`;

  constructor(private http: HttpClient) { }

  public getAll<T>(): Observable<T>{  // En la llamada se especifica el tipo
    return this.http.get<T>(`${this.urlAbout}/list`);
  }

  public getOne(): Observable<T>{
    return this.http.get<T>(this.urlAbout);
  }
/*
  public getExperience(): Observable<any>{
    return this.http.get<any>(this.urlExperience);
  }

  public getEducation(): Observable<any>{
    return this.http.get<any>(this.urlEducation);
  }

  public getSkills(): Observable<any>{
    return this.http.get<any>(this.urlSkills);
  }

  public getTecnologies(): Observable<any>{
    return this.http.get<any>(this.urlTecnologies);
  }

  public getProjects(): Observable<any>{
    return this.http.get<any>(this.urlProjects);
  }

  public getLanguages(): Observable<any>{
    return this.http.get<any>(this.urlLanguages);
  } */
}
