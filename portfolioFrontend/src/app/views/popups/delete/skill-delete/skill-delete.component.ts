import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { SkillListBindingService } from 'src/app/services/binding-services/skill-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skill-delete',
  templateUrl: './skill-delete.component.html',
  styleUrls: ['./skill-delete.component.css']
})
export class SkillDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "skill/delete";

  public deleteForm: FormGroup;

  public skillList: Array<Skill>=[];
  private skillToDelete: Skill;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    //private popupBindingService: PopupBindingService<T>,
    private skillListBindingService: SkillListBindingService<Array<Skill>>
  ) {
    this.deleteForm = this.formBilder.group({
      skillId: ""
    });

    this.skillToDelete={
      skillId: -1,
    skillName: "",
    skillType: "",
    skillDescription: "",
    skillLevel: 0,
    skillUrlIcon: "",
    skillShow: true,
    skillIndex: 99
    }

  } // Edn constructor
  
  ngOnInit(): void {
    this.deleteForm.reset();
    this.skillList.length=0;
    this.skillListBindingService.dataEmitter.subscribe((data: Array<Skill>)=>{
      this.skillList= Object.values(data);
      console.log("delete skillList ", this.skillList);
    })
  }

  delSubmit(){
        this.skillToDelete= this.skillList.find((elem: Skill)=> elem.skillId == this.deleteForm.value.skillId) || this.skillToDelete;
        if(this.skillToDelete.skillId<0){
          window.alert("Id mismatch");
        }else{
          this.closePopup();
          this.dataService.delete(`${this.deleteEndPoint}/${this.skillToDelete.skillId}`).subscribe(resp =>{
            if(resp){
              this.skillList= Object.values(resp);
              this.skillListBinding<Array<Skill>>(this.skillList);
              this.deleteForm.reset();
            }else{
              window.alert(`Delete Skill says: ${resp}`);
            }
          })
        }
  }
  

  closePopup(){
    $("#deleteSkill").modal("hide");
  }

  skillListBinding<T>(data: T) {
    this.skillListBindingService.setData<T>(data);
  }

}
