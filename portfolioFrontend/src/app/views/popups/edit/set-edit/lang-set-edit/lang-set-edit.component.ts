import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SpokenLanguage } from 'src/app/models/spoken-language.model';
import { LangListBindingService } from 'src/app/services/binding-services/lang-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-lang-set-edit',
  templateUrl: './lang-set-edit.component.html',
  styleUrls: ['./lang-set-edit.component.css']
})
export class LangSetEditComponent<T> implements OnInit {

  private langUpdateListEndPoint: string="spoken-language/list";

  public langListAll: Array<SpokenLanguage>=[];
  public langListTrue: Array<SpokenLanguage>=[];
  public langListFalse: Array<SpokenLanguage>=[];
  private langListToSend: Array<SpokenLanguage>=[];
  private langSetChanged: Set<number>=new Set();
  private lang: SpokenLanguage={
    languageId: 0,
    languageName: "",
    langLevel: "",
    percentLevel: 0,
    certificationUrl: "",
    langFlagUrl: "",
    langShow: true,
    languageIndex: 0
  }

  setForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.langSetChanged.add(e.target.value)
    this.lang = this.langListAll.find(elem => elem.languageId == e.target.value)|| this.lang;
    if(this.lang.langShow){
      this.lang.langShow= false;
      this.langListTrue= this.langListTrue.filter(elem => elem.languageId != this.lang.languageId) || [];
      this.langListFalse.push(this.lang); 
    }else if(!this.lang.langShow){
      this.lang.langShow= true;
      this.langListFalse= this.langListFalse.filter(elem => elem.languageId != this.lang.languageId) || [];
      this.langListTrue.push(this.lang); 
    }
  }

  onIndexChange(e:any){
    this.langSetChanged.add(e.target.id);
    this.langListTrue.forEach(elem=>{
      if(elem.languageId==e.target.id){
        elem.languageIndex=e.target.value;
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private langListBindingService: LangListBindingService<Array<SpokenLanguage>>
  ) {
    
    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  }

  ngOnInit(): void {
    this.langListBindingService.dataEmitter.subscribe((data: Array<SpokenLanguage>)=>{
      this.langListAll= data;
      this.langListAll.sort((a: SpokenLanguage, b: SpokenLanguage): number => a.languageIndex - b.languageIndex);
      this.langListTrue= this.langListAll.filter(elm => elm.langShow) || [];
      this.langListFalse= this.langListAll.filter(elm => !elm.langShow) || [];
    })
  }

  setSubmit(){
    // Enviar la lista al backend y que él se encargue de actualizar cada uno
      for(let item of this.langSetChanged){
        this.langListAll.forEach(sendLang =>{
          if(sendLang.languageId==item){
            this.langListToSend.push(sendLang);
          }
        })
      }
          this.closePopup();
          this.service.update(this.langUpdateListEndPoint, this.langListToSend).subscribe(resp=>{
            if(resp){
              this.langListAll = Object.values(resp);
              this.langListBinding<Array<SpokenLanguage>>(this.langListAll);
            }else{
              window.alert(`Edit Spoken Language Set says: ${resp}`);
            }
          })
    }
    
    
    closePopup(){
    $("#editLangSet").modal("hide");
  }

  
  langListBinding<T>(data: T){
    this.langListBindingService.setData<T>(data);
  }
}
