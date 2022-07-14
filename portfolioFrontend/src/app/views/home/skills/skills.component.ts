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

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";

  public skills: Array<Skill>=[];
  public shownSkills: Array<Skill>=[];

  private endPoint: string= "skill/list";

  public loaded: boolean= false;

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
    this.onWaiting();
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response){
        this.skills= Object.values(response);
        if(Array.isArray(this.skills)){
          this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
          this.skills.sort((a: Skill,b: Skill): number => a.skillIndex - b.skillIndex);
        }
        this.loaded= true;
      }else{
        console.log("Skills Component says: ", response);
      }
    });
    this.skillListBindingService.dataEmitter.subscribe((data: Array<Skill>)=>{
      this.skills= data;
      this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
      this.shownSkills.sort((a: Skill,b: Skill): number => a.skillIndex - b.skillIndex);
    })

    this.shownSkills= this.skills.filter(elem => elem.skillShow) || [];
}

onWaiting(){
  if(!this.loaded){
    let ini=0;
    setInterval(() => {
        if(this.waiting.length>18){
          this.waiting= this.waiting.substring(ini, this.waiting.length-1);
        }
        }, 2500);
        ini++;
      }
  return
}

openEditOne(i: number){
  this.skillBinding<Skill>(this.shownSkills[i]);
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
