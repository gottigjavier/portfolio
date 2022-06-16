import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { SkillBindingService } from 'src/app/services/binding-services/skill-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent<T> {

  public skill: Skill;

  private editEndPoint: string="skill/update";

  popupForm= this.fb.group({
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillIndex: 0
  })


  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<Skill>,
    private skillBindingService: SkillBindingService<T>
  ) {
    this.skill={
    skillId: 0,
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillShow: true,
    skillIndex: 0
    }

    this.popupBindingService.dataEmitter.subscribe((data: Skill) =>{
      this.skill= data;
    })

  } // end constructor

  onSubmit(){
    this.skill.skillName= this.popupForm.value.skillName || this.skill.skillName;
    this.skill.skillType= this.popupForm.value.skillType || this.skill.skillType;
    this.skill.skillDescription= this.popupForm.value.skillDescription || this.skill.skillDescription;
    this.skill.skillUrlIcon= this.popupForm.value.skillUrlIcon || this.skill.skillUrlIcon;
    this.skill.skillLevel= this.popupForm.value.skillLevel || this.skill.skillLevel;
    this.skill.skillIndex= this.popupForm.value.skillIndex || this.skill.skillIndex;
    this.dataService.update(this.editEndPoint, this.skill).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      }else{
        this.skill= resp.body;
        this.skillBinding<Skill>(this.skill);
      }
    })
    this.closePopup();
  }
  
      closePopup(){
    $("#editSkill").modal("hide");
  }

  skillBinding<T>(data: T){
    this.skillBindingService.setData<T>(data);
  }

}
