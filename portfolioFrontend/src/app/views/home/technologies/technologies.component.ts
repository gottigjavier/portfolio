import { Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { DataService } from 'src/app/services/data-services/data.service';
import { HostListener } from "@angular/core";
import { MyProject } from 'src/app/models/my-project.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';

declare var $: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent<T> implements OnInit {


  public techList: Array<Technology> = [];
  public techListShown: Array<Technology> = [];
  private tech: Technology;
  private projList: Array<MyProject> = [];
  private projGetAllEndPoint: string = "my-project/list";
  private projUpdateEndPoint: string = "my-project/update";
  private techListEndPoint: string = "technology/list";
  private delEndPoint: string = "technology/delete";

  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth);
  }

  public editMode: boolean = false;

  private list: Array<Technology>=[];

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<T>,
    private techBindingService: TechBindingService<Technology>,
    private projBindingService: ProjBindingService<T>,
    private techListBindingService: TechListBindingService<T>,
    private popupBindingService: PopupBindingService<T>
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
    this.techBindingService.dataEmitter.subscribe((data: Technology) => {
      this.tech = data;
      this.techList.forEach(elem => {
        if(elem.techId==this.tech.techId){
          this.tech=elem;
          return
        }
      })
    })

  }

  ngOnInit(): void {
    this.dataService.getAll<Array<Technology>>(this.techListEndPoint).subscribe(response => {
      console.log("tech -> ", response);
      this.list= Object.values(response);
      this.list.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
      console.log("width  ", window.innerWidth)
      this.techList = this.list;
      this.techListShown = this.list.filter((elem: Technology) => elem.techShow==true);
      this.techListBinding<Array<Technology>>(this.techList);
      this.getScreenSize();
      this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>) => {
        data.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        this.techListShown = data.filter((elem: Technology) => elem.techShow==true) || [];
      })
    })
  };

/*   deleteTech(id: number) {
    this.dataService.delete(`${this.delEndPoint}/${id}`).subscribe(resp => {
      console.log("tec respones delete ", resp)
      this.projBinding<MyProject>(resp);
    });

  }
 */

  openTechSet() {
    this.techListBinding<Array<Technology>>(this.techList);
    $("#editTechSet").modal("show");
  }

  openNewTech() {
    $("#newTech").modal("show");
  }

  openEdit(i: number) {
    this.tech= this.techList.find((elem: Technology)=> elem.techId==i) || this.tech;
    /* this.techList.forEach(elem=>{
      if(elem.techId==i){
        this.tech= elem;
      }
    }) */
    this.popupBinding<Technology>(this.tech);
    $("#editTech").modal("show");
  }

  openDeleteTech(){
    $("#deleteTech").modal("show");
  }

  modeBinding<T>(data: T) {
    this.modeBindingService.setData<T>(data);
  }

  popupBinding<T>(data: T) {
    this.popupBindingService.setData<T>(data);
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
