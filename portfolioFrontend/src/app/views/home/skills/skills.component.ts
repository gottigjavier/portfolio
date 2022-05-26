import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent<T> implements OnInit {

  public skills: Array<Skill>=[];

  private endPoint: string= "skill/list";

  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<Skill>
    ) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<Skill>>(this.endPoint).subscribe(response => {
      console.log("skills -> ", response);
      response.sort((a,b) => a.skillIndex - b.skillIndex);
      this.skills = response;
  });
}

openEdit(i: number){
  this.binding<Skill>(this.skills[i]);
  $("#editSkill").modal("show");
}

binding<T>(data: T){
  this.bindingService.setData<T>(data);
}

}
