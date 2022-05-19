import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spoken-languages',
  templateUrl: './spoken-languages.component.html',
  styleUrls: ['./spoken-languages.component.css']
})
export class SpokenLanguagesComponent<T> implements OnInit {

  public langList: Array<SpokenLanguage>=[];

  private endPoint: string= "spoken-language/list";

  constructor(private dataService: DataService<T>) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<SpokenLanguage>>(this.endPoint).subscribe(response => {
      console.log("Languages -> ", response);
      this.langList = response;
      })
  }

}
