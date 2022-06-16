import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
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
  private aboutList: Array<About>=[];
  private endPoint: string= "about/list";


  public editMode: boolean= false;
  
  costructor(
    
  ) {
    
  }
  
  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<About>,
    private aboutListBindingService: AboutListBindingService<About>
    ) {
      this.about={
        aboutId: 0,
        firstName: "",
        lastName: "",
        shortExplanation: "",
        photoUrl: "",
        aboutShown: false
        }
        this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
          this.editMode= data;
          console.log("about mode ", this.editMode);
        })
    }
    
    
  ngOnInit(): void {
    this.dataService.getAll<Array<About>>(this.endPoint).subscribe(response => {
      if(response.length>0){
        this.aboutList= Object.values(response);
        this.about= response.find(elem => elem.aboutShown== true)|| this.about;
        this.aboutListBindingService.dataEmitter.subscribe((data: Array<About>)=>{
          if(data){
            this.aboutList=data;
            this.about= this.aboutList.find(elem => elem.aboutShown== true)|| this.about;
          }
        })
        console.log("about -> ", this.about);
      }else{
        window.alert("Can not find an About of user")
      }
    }) 
  };
  
  openEditAbout(){
    this.popupBinding<About>(this.about);
    $("#editAbout").modal("show");
  }

  openNewAbout(){
    $("#newAbout").modal("show");
  }
  
  openDeleteAbout(){
    this.popupBinding<Array<About>>(this.aboutList);
    $("#deleteAbout").modal("show");
  }

  openShownAbout(){
    this.popupBinding<Array<About>>(this.aboutList);
    $("#shownAbout").modal("show");
  }
  
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

  aboutListBinding<T>(data: T){
    this.aboutListBindingService.setData<T>(data);
  }

}

