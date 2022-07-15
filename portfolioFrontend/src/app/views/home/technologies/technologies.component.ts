import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { DataService } from 'src/app/services/data-services/data.service';
import { HostListener } from "@angular/core";
import { MyProject } from 'src/app/models/my-project.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';

declare var $: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent<T> implements OnInit {

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";

  public techList: Array<Technology> = [];
  public techListShown: Array<Technology> = [];
  private tech: Technology;
  
  private techListEndPoint: string = "technology/list";
  
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth);
  }

  public loaded: boolean= false;

  public editMode: boolean = false;


  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private techBindingService: TechBindingService<Technology>,
    private projBindingService: ProjBindingService<MyProject>,
    private techListBindingService: TechListBindingService<Array<Technology>>
  ) {

    this.tech = {
      techId: 0,
      techName: "",
      techType: "",
      techDescription: "",
      techIconUrl: "",
      techLevel: 0,
      techIndex: 0,
      techShow: false
    }


    this.modeBindingService.dataEmitter.subscribe((data: boolean) => {
      this.editMode = data;
    })

  }

  ngOnInit(): void {
    this.onWaiting();
    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>) => {
      this.techList= data;
      this.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        this.techListShown = this.techList.filter((elem: Technology) => elem.techShow==true) || [];
    })
    this.dataService.getAll<any>(this.techListEndPoint).subscribe(response => {
      if(response){
        this.techList = Object.values(response);
        this.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        //console.log("width  ", window.innerWidth)
        if(Array.isArray(this.techList)){
          this.techListShown = this.techList.filter((elem: Technology) => elem.techShow==true) || [];
          this.techListBinding<Array<Technology>>(this.techList);
        }
        this.getScreenSize();
        this.loaded= true;
      }else{
        console.log("Technologies Component says: ", response);
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

  openTechSet() {
    this.techListBinding<Array<Technology>>(this.techList);
    $("#editTechSet").modal("show");
  }

  openNewTech() {
    this.techListBinding<Array<Technology>>(this.techList);
    $("#newTech").modal("show");
  }

  openEdit(tech: Technology) {
    this.techListBinding<Array<Technology>>(this.techList);
    this.techBinding<Technology>(tech);
    $("#editTech").modal("show");
  }

  openDeleteTech(){
    this.techListBinding<Array<Technology>>(this.techList);
    $("#deleteTech").modal("show");
  }

  modeBinding<T>(data: T) {
    this.modeBindingService.setData<T>(data);
  }

  techBinding<T>(data: T) {
    this.techBindingService.setData<T>(data);
  }

  projBinding<T>(data: T) {
    this.projBindingService.setData<T>(data);
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}
