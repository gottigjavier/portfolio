import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private user: any;

  constructor(
    //private dataService: DataService
    ) { }

  ngOnInit(): void {
    /* this.dataService.getAbout().subscribe(response => {
      this.user = response.about;
      console.log("about -> ", this.user);
    }) */
  };

}

