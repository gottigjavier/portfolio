import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { LangListBindingService } from 'src/app/services/binding-services/lang-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-lang-delete',
  templateUrl: './lang-delete.component.html',
  styleUrls: ['./lang-delete.component.css']
})
export class LangDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "spoken-language";

  public deleteForm: FormGroup;

  public langList: Array<SpokenLanguage>=[];
  private langToDelete: SpokenLanguage;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private langListBindingService: LangListBindingService<Array<SpokenLanguage>>
  ) {
    this.deleteForm = this.formBilder.group({
      langId: ""
    });

    this.langToDelete={
    languageId: -1,
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    langShow: true,
    languageIndex: 99
    }

    this.langListBindingService.dataEmitter.subscribe((data: Array<SpokenLanguage>)=>{
      this.langList= Object.values(data);
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
  }

  delSubmit(){
    this.langList.forEach(elem => {
        if(elem.languageId == this.deleteForm.value.langId){
          this.langToDelete=elem;
          return
        }
      })
        if(this.langToDelete.languageId<0){
          window.alert("Id mismatch");
        }else{
          this.closePopup();
          this.dataService.delete(`${this.deleteEndPoint}/${this.langToDelete.languageId}`).subscribe(resp =>{
            if(resp){
              this.langList.length=0;
              this.langList= Object.values(resp);
              this.langListBinding<Array<SpokenLanguage>>(this.langList);
              this.deleteForm.reset();
            }else{
              window.alert(`Delete Spoken Language says: ${resp}`);
            }
          })
        }
  }
  

  closePopup(){
    $("#deleteLang").modal("hide");
  }

  langListBinding<T>(data: T) {
    this.langListBindingService.setData<T>(data);
  }

}
