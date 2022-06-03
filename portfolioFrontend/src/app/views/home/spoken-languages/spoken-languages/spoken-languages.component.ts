import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-spoken-languages',
  templateUrl: './spoken-languages.component.html',
  styleUrls: ['./spoken-languages.component.css']
})
export class SpokenLanguagesComponent<T> implements OnInit {

  public langList: Array<SpokenLanguage>=[];

  private endPoint: string= "spoken-language/list";

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<SpokenLanguage>) {
      this.bindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<SpokenLanguage>>(this.endPoint).subscribe(response => {
      console.log("Languages -> ", response);
      response.sort((a,b) => a.languageIndex - b.languageIndex);
      this.langList = response;
      })
  }

openEdit(i: number){
  this.binding<SpokenLanguage>(this.langList[i]);
  $("#editLang").modal("show");
}

binding<T>(data: T){
  this.bindingService.setData<T>(data);
}

}
