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
    private bindingService: BindingService<About>
    ) { }
    
    
  ngOnInit(): void {
    this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      this.about= response[response.length-1]; // Last created
      console.log("about -> ", this.about);
    }) 
  };
  
  openEdit(){
    this.binding<About>(this.about);
    $("#editAbout").modal("show");
  }
  
  binding<T>(data: T){
    this.bindingService.setData<T>(data);
  }

}

