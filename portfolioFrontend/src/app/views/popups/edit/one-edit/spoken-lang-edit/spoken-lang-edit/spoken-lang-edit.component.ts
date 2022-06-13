import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-spoken-lang-edit',
  templateUrl: './spoken-lang-edit.component.html',
  styleUrls: ['./spoken-lang-edit.component.css']
})
export class SpokenLangEditComponent<T>{

  public lang: SpokenLanguage;

  private editEndPoint: string="spoken-language/update";

  popupForm= this.fb.group({
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    languageIndex: 0
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<SpokenLanguage>
  ) {
    this.lang={
    languageId: 0,
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    langShow: true,
    languageIndex: 0
    }

    this.popupBindingService.dataEmitter.subscribe((data: SpokenLanguage) =>{
      this.lang= data;
    })

  } // end constructor

  onSubmit(){
    this.lang.languageName= this.popupForm.value.languageName || this.lang.languageName;
    this.lang.langFlagUrl= this.popupForm.value.langFlagUrl || this.lang.langFlagUrl;
    this.lang.certificationUrl= this.popupForm.value.certificationUrl || this.lang.certificationUrl;
    this.lang.langLevel= this.popupForm.value.langLevel || this.lang.langLevel;
    this.lang.percentLevel= this.popupForm.value.percentLevel || this.lang.percentLevel;
    this.lang.languageIndex= this.popupForm.value.languageIndex || this.lang.languageIndex;
    this.dataService.update(this.editEndPoint, this.lang).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
  }
  
      closePopup(){
    $("#editLang").modal("hide");
  }

}
