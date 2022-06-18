import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { SkillListBindingService } from 'src/app/services/binding-services/skill-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent<T> {

  public skill: Skill;
  
  private newSkillEndPoint: string="skill/create";

  popupForm= this.fb.group({
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillIndex: 99
  })


  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private skillListBindingService: SkillListBindingService<T>
  ) {
    this.skill={
    skillId: 0,
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillShow: true,
    skillIndex: 99
    }

  } // end constructor

  onSubmit(){
    if(!this.popupForm.value.skillUrlIcon || !this.popupForm.value.skillUrlIcon.startsWith("http")){
      window.alert(`"${this.popupForm.value.skillUrlIcon}" is not valid url. Default url will be used.`);
      this.skill.skillUrlIcon= "https://i.imgur.com/FpQreWg.jpeg";
    }else{
      this.skill.skillUrlIcon= this.popupForm.value.skillUrlIcon || this.skill.skillUrlIcon;
    }
    this.skill.skillName= this.popupForm.value.skillName || this.skill.skillName;
    this.skill.skillType= this.popupForm.value.skillType || this.skill.skillType;
    this.skill.skillDescription= this.popupForm.value.skillDescription || this.skill.skillDescription;
    this.skill.skillLevel= this.popupForm.value.skillLevel || this.skill.skillLevel;
    this.skill.skillIndex= this.popupForm.value.skillIndex || this.skill.skillIndex;
    this.dataService.create(this.newSkillEndPoint, this.skill).subscribe(resp =>{
      if(resp.statusCode == "OK"){
        let list: Array<Skill> = Object.values(resp.body);
        this.skillListBinding<Array<Skill>>(list);
      }else{
        window.alert(`Error: ${resp.statusCode}`);
      }
    })
    this.closePopup();
  }
  
      closePopup(){
        this.popupForm.reset();
    $("#newSkill").modal("hide");
  }

  skillListBinding<T>(data: T){
    this.skillListBindingService.setData<T>(data);
  }

}
