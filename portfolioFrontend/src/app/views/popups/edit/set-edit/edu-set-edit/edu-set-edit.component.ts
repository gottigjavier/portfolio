import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-edu-set-edit',
  templateUrl: './edu-set-edit.component.html',
  styleUrls: ['./edu-set-edit.component.css']
})
export class EduSetEditComponent<T> implements OnInit {

  private educUpdateListEndPoint: string="education/update/list";

  public eduListAll: Array<Education>=[];
  public eduListTrue: Array<Education>=[];
  public eduListFalse: Array<Education>=[];
  private eduListToSend: Array<Education>=[];
  private eduSetChanged: Set<number>=new Set();
  private edu: Education={
    educationId: 0,
    educationCareer: "",
    educationType: "",
    educationStart: "",
    educationEnd: "",
    approvedLevel: 30,
    institutionName: "",
    institutionLink: "",
    institutionLogo: "",
    eduShow: true,
    eduIndex: 0
  }

  setForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.eduSetChanged.add(e.target.value)
    this.edu = this.eduListAll.find(elem => elem.educationId == e.target.value)|| this.edu;
    if(this.edu.eduShow){
      this.edu.eduShow= false;
      this.eduListTrue= this.eduListTrue.filter(elem => elem.educationId != this.edu.educationId) || [];
      this.eduListFalse.push(this.edu); 
    }else if(!this.edu.eduShow){
      this.edu.eduShow= true;
      this.eduListFalse= this.eduListFalse.filter(elem => elem.educationId != this.edu.educationId) || [];
      this.eduListTrue.push(this.edu); 
    }
  }

  onIndexChange(e:any){
    this.eduSetChanged.add(e.target.id);
    this.eduListTrue.forEach(elem=>{
      if(elem.educationId==e.target.id){
        elem.eduIndex=e.target.value;
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private eduListBindingService: EduListBindingService<Array<Education>>
  ) {
    
    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  }

  ngOnInit(): void {
    this.eduListBindingService.dataEmitter.subscribe((data: Array<Education>)=>{
      this.eduListAll= data;
      this.eduListAll.sort((a: Education, b: Education): number => a.eduIndex - b.eduIndex);
      this.eduListTrue= this.eduListAll.filter(elm => elm.eduShow) || [];
      this.eduListFalse= this.eduListAll.filter(elm => !elm.eduShow) || [];
    })
  }

  setSubmit(){
    // Enviar la lista al backend y que él se encargue de actualizar cada uno
      for(let item of this.eduSetChanged){
        console.log("item set", item);
        this.eduListAll.forEach(sendEdu =>{
          if(sendEdu.educationId==item){
            this.eduListToSend.push(sendEdu);
          }
        })
      }
          this.closePopup();
          this.service.update(this.educUpdateListEndPoint, this.eduListToSend).subscribe(resp=>{
            if(resp){
              this.eduListAll = Object.values(resp);
              this.eduListBinding<Array<Education>>(this.eduListAll);
            }else{
              window.alert(`Edit Education Set says: ${resp}`);
            }
          })
    }
    
    
    closePopup(){
    $("#editEduSet").modal("hide");
  }

  
  eduListBinding<T>(data: T){
    this.eduListBindingService.setData<T>(data);
  }
}
