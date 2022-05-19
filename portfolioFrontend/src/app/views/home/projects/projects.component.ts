import { Component, OnInit } from '@angular/core';
import { MyProject } from 'src/app/models/my-project.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent<T> implements OnInit {

  public projList: Array<MyProject>=[];
  private endPoint: string= "my-project/list";

  constructor(private dataService: DataService<T>) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<MyProject>>(this.endPoint).subscribe(response => {
      console.log("proj list -> ", response);
      this.projList = response;
    }) 
};
  }