import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlUser: string = "http://localhost:3003/user";
  private urlAbout: string = "http://localhost:3003/about";
  private urlExperience: string = "http://localhost:3003/experience";
  private urlEducation: string = "http://localhost:3003/education";
  private urlSkills: string = "http://localhost:3003/skills";
  private urlTecnologies: string = "http://localhost:3003/tecnologies";
  private urlProjects: string = "http://localhost:3003/projects";
  private urlLanguages: string = "http://localhost:3003/languages";

  constructor(private http: HttpClient) { }

  public getUser(): Observable<any>{
    return this.http.get<any>(this.urlUser);
  }

  public getAbout(): Observable<any>{
    return this.http.get<any>(this.urlAbout);
  }

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
  }
}
