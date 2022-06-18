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
    private skillListBindingService: SkillListBindingService<T>
  ) {
    this.deleteForm = this.formBilder.group({
      skillId: ""
    });

    this.skillToDelete={
      skillId: 0,
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
    // En algun momento, si creo, edito a mansalva, o no aparece alguna skill para borrar
    // o al borrarla no desaparece de la lista de borrar (ver eso)
    this.deleteForm.reset();
    this.skillList.length=0;
    this.skillListBindingService.dataEmitter.subscribe((data: Array<Skill>)=>{
      this.skillList= Object.values(data);
      console.log("delete skillList ", this.skillList);
    })
  }

  delSubmit(){
    this.skillList.forEach(elem => {
        if(elem.skillId == this.deleteForm.value.skillId){
          this.skillToDelete=elem;
          return
        }
      })
        if(this.skillToDelete.skillId<0){
          window.alert("Id miseDataServiceatch");
        }else{
          this.dataService.delete(`${this.deleteEndPoint}/${this.skillToDelete.skillId}`).subscribe(resp =>{
            if(resp.statusCode== "OK"){
              let list: Array<Skill>= Object.values(resp.body);
              this.skillList= list;
              this.skillListBinding<Array<Skill>>(this.skillList);
              this.deleteForm.reset();
              //this.skillList.length=0;
            }else{
              window.alert(`Error: ${resp.statusCode}`);
            }
          })
          this.closePopup();
        }
  }
  

  closePopup(){
    $("#deleteSkill").modal("hide");
  }

  skillListBinding<T>(data: T) {
    this.skillListBindingService.setData<T>(data);
  }

}
