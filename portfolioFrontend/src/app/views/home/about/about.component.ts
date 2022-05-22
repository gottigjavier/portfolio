import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent<T> implements OnInit {

  public about: About={
  aboutId: 0,
  firstName: "",
  lastName: "",
  shortExplanation: "",
  photoUrl: ""
  };
  private endPoint: string= "about/list";
  
  constructor(
    private dataService: DataService<T>,
    private binding: BindingService<About>
    ) { }
  openPopup(){
    this.bindingAbout();
    $("#myModal").modal("show");
  }


  ngOnInit(): void {
    this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      this.about= response[0];
      console.log("about -> ", this.about);
    }) 
  };
  
  bindingAbout(){
    this.binding.setData(this.about);
  }

}

