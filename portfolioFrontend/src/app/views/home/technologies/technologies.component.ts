import { Component, OnInit } from '@angular/core';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent<T> implements OnInit {


  private techList: Array<Technology>=[];
  public technology= new Technology();
  private endPoint: string= "technology/list";
  //private myproject= new MyProject();

  constructor(private dataService: DataService<T>) {
    
  }

  ngOnInit(): void {
    this.dataService.getAll<Array<Technology>>(this.endPoint).subscribe(response => {
      console.log("tech -> ", response);
      this.techList = response;
      //this.technology= this.techList[0];
    }) 
};

}
