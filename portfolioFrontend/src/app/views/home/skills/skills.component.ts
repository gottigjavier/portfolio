import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent<T> implements OnInit {

  public skills: Array<Skill>=[];

  private endPoint: string= "skill/list";

  constructor(private dataService: DataService<T>) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<Skill>>(this.endPoint).subscribe(response => {
      console.log("skills -> ", response);
      this.skills = response;
  });
}
}
