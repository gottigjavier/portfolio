import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { SkillBindingService } from 'src/app/services/binding-services/skill-binding.service';
import { SkillListBindingService } from 'src/app/services/binding-services/skill-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent<T> implements OnInit {

  public skills: Array<Skill>=[];
  public shownSkills: Array<Skill>=[];

  private endPoint: string= "skill/list";

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private skillBindingService: SkillBindingService<Skill>,
    private skillListBindingService: SkillListBindingService<Array<Skill>>
    ) {

      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response.statusCode == "OK"){
        let list: Array<Skill>= Object.values(response.body);
        this.skills = list;
        if(Array.isArray(this.skills)){
          this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
          this.shownSkills.sort((a: Skill,b: Skill): number => a.skillIndex - b.skillIndex);
        }
      }else{
        window.alert(`Error: ${response.statusCode}`);
      }
    });
    this.skillListBindingService.dataEmitter.subscribe((data: Array<Skill>)=>{
      this.skills= data;
      this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
      this.shownSkills.sort((a: Skill,b: Skill): number => a.skillIndex - b.skillIndex);
    })

    this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
}

openEditOne(i: number){
  this.skillBinding<Skill>(this.skills[i]);
  $("#editSkill").modal("show");
}

openNewSkill(){
  $("#newSkill").modal("show");
}

openDeleteSkill(){
  this.skillListBinding<Array<Skill>>(this.skills);
  $("#deleteSkill").modal("show");
}

openEditSetSkills(){
  this.skillListBinding<Array<Skill>>(this.skills);
  $("#editSkillSet").modal("show");
  // binding list
}

skillBinding<T>(data: T){
  this.skillBindingService.setData<T>(data);
}

skillListBinding<T>(data: T){
  this.skillListBindingService.setData<T>(data);
}

}
