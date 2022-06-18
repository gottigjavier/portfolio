import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { LangListBindingService } from 'src/app/services/binding-services/lang-list-binding.service';
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
    private popupBindingService: PopupBindingService<T>,
    private langListBindingService: LangListBindingService<T>
    )
    {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })

      this.langListBindingService.dataEmitter.subscribe((data: Array<SpokenLanguage>)=>{
        this.langList= Object.values(data);
        this.ngOnInit();
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response.statusCode == "OK"){
        let list: Array<SpokenLanguage>= Object.values(response.body);
        this.langList = list;
        if(Array.isArray(this.langList)){
          this.langList.sort((a: SpokenLanguage, b: SpokenLanguage): number => a.languageIndex - b.languageIndex);
        }
      }else{
        window.alert(`Error: ${response.statusCode}`);
      }
      })
  }

openEditOne(i: number){
  this.popupBinding<SpokenLanguage>(this.langList[i]);
  $("#editLang").modal("show");
}

openNewLang(){
  $("#newLang").modal("show");
}

openEditSetLang(){

}

openDeleteLang(){
  this.langListBinding<Array<SpokenLanguage>>(this.langList);
  $("#deleteLang").modal("show");
}

popupBinding<T>(data: T){
  this.popupBindingService.setData<T>(data);
}

langListBinding<T>(data: T){
  this.langListBindingService.setData<T>(data);
}

}
