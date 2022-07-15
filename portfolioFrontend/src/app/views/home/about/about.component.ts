import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about.model';
import { AboutBindingService } from 'src/app/services/binding-services/about-binding.service';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent<T> implements OnInit {

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";

  public about: About;
  private aboutList: Array<About>=[];
  private endPoint: string= "about/list";

  public loaded: boolean= false;

  public editMode: boolean= false;
  
  costructor(
    
  ) {
    
  }
  
  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private aboutListBindingService: AboutListBindingService<Array<About>>,
    private aboutBindingService: AboutBindingService<About>
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
        })
    }
    
    
  ngOnInit(): void {
    this.onWaiting();
    this.aboutListBindingService.dataEmitter.subscribe((data: Array<About>)=>{
      let list= Object.values(data);
      if(Array.isArray(list)){
        this.aboutList=list;
        this.about= this.aboutList.find(elem => elem.aboutShown== true)|| this.about;
      }
    })
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response){
        this.aboutList= Object.values((response));
        this.about= this.aboutList.find(elem => elem.aboutShown== true)|| this.about;
        this.loaded= true;
      }else{
        console.log("About Component says: ", response);
      }
    }) 
  };

  onWaiting(){
    if(!this.loaded){
      let ini=0;
      setInterval(() => {
          if(this.waiting.length>18){
            this.waiting= this.waiting.substring(ini, this.waiting.length-1);
          }
          }, 3000);
          ini++;
        }
    return
  }
  
  openEditAbout(){
    this.aboutBinding<About>(this.about);
    $("#editAbout").modal("show");
  }

  openNewAbout(){
    $("#newAbout").modal("show");
  }
  
  openDeleteAbout(){
    this.aboutListBinding<Array<About>>(this.aboutList);
    $("#deleteAbout").modal("show");
  }

  openShownAbout(){
    this.aboutListBinding<Array<About>>(this.aboutList);
    $("#shownAbout").modal("show");
  }
  
  aboutBinding<T>(data: T){
    this.aboutBindingService.setData<T>(data);
  }

  aboutListBinding<T>(data: T){
    this.aboutListBindingService.setData<T>(data);
  }

}

