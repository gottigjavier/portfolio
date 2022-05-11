import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent<T> implements OnInit {

  private about: About;
  private aboutList: Array<About> = [];
  private endPoint: string= "about/list";

  constructor(
    private dataService: DataService<T>
    ) {
      this.aboutList =[
        this.about={
        aboutId: 0,
      firstName: "",
      lastName: "",
      shortExplanation: "",
      photoUrl: ""
      }]
  }

  ngOnInit(): void {
      this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      console.log("about -> ", response);
    }) 
   };

}

