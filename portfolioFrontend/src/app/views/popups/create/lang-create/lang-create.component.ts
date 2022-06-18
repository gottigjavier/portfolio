import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { LangListBindingService } from 'src/app/services/binding-services/lang-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-lang-create',
  templateUrl: './lang-create.component.html',
  styleUrls: ['./lang-create.component.css']
})
export class LangCreateComponent<T> {

  public lang: SpokenLanguage;

  private newLangEndPoint: string="spoken-language/create";

  popupForm= this.fb.group({
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    languageIndex: 99
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private langListBindingService: LangListBindingService<T>
  ) {
    this.lang={
    languageId: 0,
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    langShow: true,
    languageIndex: 99
    }

  } // end constructor

  onSubmit(){
    if(!this.popupForm.value.langFlagUrl.startsWith("http")){
      window.alert(`"${this.popupForm.value.langFlagUrl}" is not valid url. Default url will be used.`);
      this.lang.langFlagUrl= "https://i.imgur.com/FpQreWg.jpeg";
    }else{
      this.lang.langFlagUrl= this.popupForm.value.langFlagUrl || this.lang.langFlagUrl;
    }
    if(!this.popupForm.value.certificationUrl.startsWith("http")){
      window.alert(`"${this.popupForm.value.certificationUrl}" is not valid url. Default url will be used.`);
      this.lang.certificationUrl= "#";
    }else{
      this.lang.certificationUrl= this.popupForm.value.certificationUrl || this.lang.certificationUrl;
    }
    this.lang.languageName= this.popupForm.value.languageName || this.lang.languageName;
    this.lang.langLevel= this.popupForm.value.langLevel || this.lang.langLevel;
    this.lang.percentLevel= this.popupForm.value.percentLevel || this.lang.percentLevel;
    this.lang.languageIndex= this.popupForm.value.languageIndex || this.lang.languageIndex;
    this.dataService.create(this.newLangEndPoint, this.lang).subscribe(resp =>{
      if(resp.statusCode == "OK"){
        let list: Array<SpokenLanguage> = Object.values(resp.body);
        this.langListBinding<Array<SpokenLanguage>>(list);
      }else{
        window.alert(`Error: ${resp.statusCode}`);
      }
    })
    this.closePopup();
  }
  
      closePopup(){
        this.popupForm.reset();
    $("#newLang").modal("hide");
  }

  langListBinding<T>(data: T){
    this.langListBindingService.setData<T>(data);
  }

}
