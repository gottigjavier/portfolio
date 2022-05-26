import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-spoken-languages-edit',
  templateUrl: './spoken-languages-edit.component.html',
  styleUrls: ['./spoken-languages-edit.component.css']
})
export class SpokenLanguagesEditComponent<T>{

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
    private service: DataService<T>,
    private binding: BindingService<SpokenLanguage>
  ) {
    this.lang={
    languageId: 0,
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    languageIndex: 0
    }

    this.binding.dataEmitter.subscribe((data: SpokenLanguage) =>{
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
    this.service.update(this.editEndPoint, this.lang).subscribe(resp =>{
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
