import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent<T> implements OnInit {

  public skills: Array<Skill>=[];

  private endPoint: string= "skill/list";

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<Skill>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<Skill>>(this.endPoint).subscribe(response => {
      this.skills = Object.values(response);
      this.skills.sort((a: Skill,b: Skill): number => a.skillIndex - b.skillIndex);
  });
}

openEditOne(i: number){
  this.popupBinding<Skill>(this.skills[i]);
  $("#editSkill").modal("show");
}

openNewSkill(){

}

openDeleteSkill(){

}

openEditSetSkills(){

}

popupBinding<T>(data: T){
  this.popupBindingService.setData<T>(data);
}

}
