import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent<T> implements OnInit {

  public about: About;
  private endPoint: string= "about/list";


  public editMode: boolean= false;
  
  costructor(
    
  ) {
    
  }
  
  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<About>
    ) {
      this.about={
        aboutId: 0,
        firstName: "",
        lastName: "",
        shortExplanation: "",
        photoUrl: ""
        }
        this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
          this.editMode= data;
          console.log("about mode ", this.editMode);
        })
    }
    
    
  ngOnInit(): void {
    this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      this.about= response[response.length-1]; // Last created
      console.log("about -> ", this.about);
    }) 
  };
  
  openEdit(){
    this.popupBinding<About>(this.about);
    $("#editAbout").modal("show");
  }
  
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

}

