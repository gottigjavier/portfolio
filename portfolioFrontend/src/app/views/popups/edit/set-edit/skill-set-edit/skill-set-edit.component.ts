import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { SkillListBindingService } from 'src/app/services/binding-services/skill-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skill-set-edit',
  templateUrl: './skill-set-edit.component.html',
  styleUrls: ['./skill-set-edit.component.css']
})
export class SkillSetEditComponent<T> implements OnInit {

  private skillUpdateListEndPoint: string="skill/update/list";

  public skillListAll: Array<Skill>=[];
  public skillListTrue: Array<Skill>=[];
  public skillListFalse: Array<Skill>=[];
  private skillListToSend: Array<Skill>=[];
  private skillSetChanged: Set<number>=new Set();
  private skill: Skill={
    skillId: 0,
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillShow: true,
    skillIndex: 0
  }

  setForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.skillSetChanged.add(e.target.value)
    this.skill = this.skillListAll.find(elem => elem.skillId == e.target.value)|| this.skill;
    if(this.skill.skillShow){
      this.skill.skillShow= false;
      this.skillListTrue= this.skillListTrue.filter(elem => elem.skillId != this.skill.skillId) || [];
      this.skillListFalse.push(this.skill); 
    }else if(!this.skill.skillShow){
      this.skill.skillShow= true;
      this.skillListFalse= this.skillListFalse.filter(elem => elem.skillId != this.skill.skillId) || [];
      this.skillListTrue.push(this.skill); 
    }
    console.log("skill shown ", e.target.value)
  }

  onIndexChange(e:any){
    this.skillSetChanged.add(e.target.id);
    this.skillListTrue.forEach(elem=>{
      if(elem.skillId==e.target.id){
        elem.skillIndex=e.target.value;
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private skillListBindingService: SkillListBindingService<Array<Skill>>
  ) {
    
    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  }

  ngOnInit(): void {
    this.skillListBindingService.dataEmitter.subscribe((data: Array<Skill>)=>{
      this.skillListAll= data;
      this.skillListAll.sort((a: Skill, b: Skill): number => a.skillIndex - b.skillIndex);
      this.skillListTrue= this.skillListAll.filter(elm => elm.skillShow) || [];
      this.skillListFalse= this.skillListAll.filter(elm => !elm.skillShow) || [];
    })
  }

  setSubmit(){
    // Enviar la lista al backend y que él se encargue de actualizar cada uno
      for(let item of this.skillSetChanged){
        this.skillListAll.forEach(sendSkill =>{
          if(sendSkill.skillId==item){
            this.skillListToSend.push(sendSkill);
          }
          this.service.update(this.skillUpdateListEndPoint, this.skillListToSend).subscribe(resp=>{
            if(resp){
              this.skillListAll = Object.values(resp);
              this.skillListBinding<Array<Skill>>(this.skillListAll);
              this.closePopup();
            }else{
              window.alert(`Edit Skill Set says: ${resp}`);
            }
          })
        })
      }
    }
    
    
    closePopup(){
    $("#editSkillSet").modal("hide");
  }

  
  skillListBinding<T>(data: T){
    this.skillListBindingService.setData<T>(data);
  }

}
