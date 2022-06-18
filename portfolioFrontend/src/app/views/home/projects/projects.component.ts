import { Component, OnInit } from '@angular/core';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { ProjListBindingService } from 'src/app/services/binding-services/proj-list-binding-service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent<T> implements OnInit {

  public projList: Array<MyProject> = [];
  public projListShown: Array<MyProject> = [];
  public projListTechShown: Array<MyProject> = [];
  private endPoint: string = "my-project/list";
  public techListShown: Array<Technology> = [];
  private proj: MyProject={
    projId:0,
    projName:"",
    projDescription:"",
    projUrl:"",
    projShow: true,
    projIndex:0,
    techList:[]
  }


  public editMode: boolean = false;
  list: any;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    //private techBindingService: TechBindingService<T>,
    private projBindingService: ProjBindingService<MyProject>,
    //private popupBindingService: PopupBindingService<T>,
    private techListBindingService: TechListBindingService<Array<Technology>>,
    private projListBindingService: ProjListBindingService<Array<MyProject>>
  ) {
    this.modeBindingService.dataEmitter.subscribe((data: boolean) => {
      this.editMode = data;
    })
    

    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>) =>{
      let list= Object.values(data);
      list.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
      this.techListShown= list.filter(elem => elem.techShow==true) || [];
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response.statusCode == "OK"){
      let list: Array<MyProject>= Object.values(response.body);
      if(Array.isArray(list)){
        list.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
        this.projList = list;
        this.projListShown= list.filter((elem: MyProject) => elem.projShow==true) || [];
        this.projList.forEach(elem=>{
          elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        })
      }
    }else{
      window.alert(`Error: ${response.statusCode}`);
    }
      })
    this.projBindingService.dataEmitter.subscribe((data: MyProject) => {
      if(data){
          this.projList.forEach(proj => {
            if (data.projId==proj.projId) {
              proj = data;
            }
            this.dataService.getAll<any>(this.endPoint).subscribe(response => {
              if(response.statusCode == "OK"){
              let list: Array<MyProject>= Object.values(response.body);
              if(Array.isArray(list)){
                list.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
                this.projList = list;
                this.projListShown= list.filter((elem: MyProject) => elem.projShow==true) || [];
                this.projList.forEach(elem=>{
                  elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
                })
              }
            }
              })
            return this.projListShown;
          })
        }
    })
    this.projListBindingService.dataEmitter.subscribe((data: Array<MyProject>)=>{
      let list= Object.values(data);
      if(Array.isArray(list)){
        list.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
        this.projList= list;
        this.projListShown= this.projList.filter((elem: MyProject) => elem.projShow==true) || [];
      }
    })
  };

  
  openEditOneProj(i: number) {
    this.proj= this.projList.find(elem=> elem.projId== i) || this.proj;
    this.projBinding<MyProject>(this.proj);
    console.log("Projct comp, is techList array? ", Array.isArray(this.techListShown));
    this.techListBinding<Array<Technology>>(this.techListShown);
    $("#editProj").modal("show");
  }
  
  openNewProj(){
    this.techListBinding<Array<Technology>>(this.techListShown);
    $("#newProj").modal("show");
  }
  
  openEditProjSet(){
    this.projListBinding<Array<MyProject>>(this.projList);
    $("#editProjSet").modal("show");
  }

  openDeleteProj(){
    $("#deleteProj").modal("show");
    this.projListBinding<Array<MyProject>>(this.projList);
  }

  projBinding<T>(data: T) {
    this.projBindingService.setData<T>(data);
  }

  projListBinding<T>(data: T) {
    this.projListBindingService.setData<T>(data);
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}