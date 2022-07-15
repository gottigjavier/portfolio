import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { LangBindingService } from 'src/app/services/binding-services/lang-binding.service';
import { LangListBindingService } from 'src/app/services/binding-services/lang-list-binding.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-spoken-languages',
  templateUrl: './spoken-languages.component.html',
  styleUrls: ['./spoken-languages.component.css']
})
export class SpokenLanguagesComponent<T> implements OnInit {

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";


  public langList: Array<SpokenLanguage>=[];
  public langShownList: Array<SpokenLanguage>=[];

  private endPoint: string= "spoken-language/list";

  public loaded: boolean= false;

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private langBindingService: LangBindingService<SpokenLanguage>,
    private langListBindingService: LangListBindingService<Array<SpokenLanguage>>
    )
    {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })

    }

  ngOnInit(): void {
    this.onWaiting();
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response){
        this.langList = Object.values(response);
        if(Array.isArray(this.langList)){
          this.langShownList= this.langList.filter(elem => elem.langShow) || [];
          this.langShownList.sort((a: SpokenLanguage, b: SpokenLanguage): number => a.languageIndex - b.languageIndex);
        }
        this.loaded= true;
      }else{
        console.log("Spoken Languages Component says: ", response);
      }
      })

      this.langListBindingService.dataEmitter.subscribe((data: Array<SpokenLanguage>)=>{
        this.langList= data;
        this.langShownList= this.langList.filter(elem => elem.langShow) || [];
        this.langShownList.sort((a: SpokenLanguage, b: SpokenLanguage): number => a.languageIndex - b.languageIndex);
      })
  }

  onWaiting(){
    if(!this.loaded){
      let ini=0;
      setInterval(() => {
          if(this.waiting.length>18){
            this.waiting= this.waiting.substring(ini, this.waiting.length-1);
          }
          }, 3000);
          ini++;
        }
    return
  }

openEditOne(i: number){
  this.langBinding<SpokenLanguage>(this.langShownList[i]);
  $("#editLang").modal("show");
}

openNewLang(){
  $("#newLang").modal("show");
}

openEditSetLang(){
  this.langListBinding<Array<SpokenLanguage>>(this.langList);
  $("#editLangSet").modal("show");
}

openDeleteLang(){
  this.langListBinding<Array<SpokenLanguage>>(this.langList);
  $("#deleteLang").modal("show");
}

langBinding<T>(data: T){
  this.langBindingService.setData<T>(data);
}

langListBinding<T>(data: T){
  this.langListBindingService.setData<T>(data);
}

}
