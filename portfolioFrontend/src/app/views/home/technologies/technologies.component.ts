import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent<T> implements OnInit {


  public techList: Array<Technology>=[];
  private endPoint: string= "technology/list";
  
  constructor(private dataService: DataService<T>) {
    
  }

  ngOnInit(): void {
    this.dataService.getAll<Array<Technology>>(this.endPoint).subscribe(response => {
      console.log("tech -> ", response);
      response.sort((a,b) => a.techIndex - b.techIndex);
      console.log("width  ", window.innerWidth)
      this.techList = response;
      this.techList.map(tech =>{
        tech.techLevel= tech.techLevel*window.innerWidth/400;
      })
    }) 
};

}
