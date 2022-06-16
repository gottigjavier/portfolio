import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

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
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<SpokenLanguage>) 
    {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<SpokenLanguage>>(this.endPoint).subscribe(response => {
      this.langList = Object.values(response);
      this.langList.sort((a,b) => a.languageIndex - b.languageIndex);
      })
  }

openEditOne(i: number){
  this.popupBinding<SpokenLanguage>(this.langList[i]);
  $("#editLang").modal("show");
}

openNewLang(){

}

openEditSetLang(){

}

openDeleteLang(){
  
}

popupBinding<T>(data: T){
  this.popupBindingService.setData<T>(data);
}

}
