import { Component, OnInit } from '@angular/core';
import { MyProject } from 'src/app/models/my-project.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent<T> implements OnInit {

  public projList: Array<MyProject>=[];
  private endPoint: string= "my-project/list";

  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<MyProject>
    ) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<MyProject>>(this.endPoint).subscribe(response => {
      console.log("proj list -> ", response);
      response.sort((a,b) => a.projIndex - b.projIndex);
      this.projList = response;
    }) 
};

openEdit(i: number){
  this.binding(this.projList[i]);
  $("#editProj").modal("show");
}

binding(proj: MyProject){
  this.bindingService.setData(proj);
}

  }