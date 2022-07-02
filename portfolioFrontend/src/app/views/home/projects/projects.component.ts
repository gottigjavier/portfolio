import { Component, OnInit } from '@angular/core';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { ProjListBindingService } from 'src/app/services/binding-services/proj-list-binding-service';
import { ProjTechListBindingService } from 'src/app/services/binding-services/proj-tech-list-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent<T> implements OnInit {

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";

  public projList: Array<MyProject> = [];
  public projListShown: Array<MyProject> = [];
  public projListTechShown: Array<MyProject> = [];
  private projEndPoint: string = "my-project/list";
  private projUpdateEndPoint: string="my-project/update/list";
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

  public loaded: boolean= false;

  public editMode: boolean = false;
  
  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private projBindingService: ProjBindingService<MyProject>,
    private techListBindingService: TechListBindingService<Array<Technology>>,
    private projTechListBindingService: ProjTechListBindingService<Array<Technology>>,
    private projListBindingService: ProjListBindingService<Array<MyProject>>
  ) {

    this.modeBindingService.dataEmitter.subscribe((data: boolean) => {
      this.editMode = data;
    })
    
  }

  ngOnInit(): void {
    this.onWaiting();
    this.dataService.getAll<any>(this.projEndPoint).subscribe(response => {
      if(response){
        this.projList= Object.values(response);
        this.projList.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
        this.projListShown= this.projList.filter((elem: MyProject) => elem.projShow==true) || [];
        this.projList.forEach(elem=>{
          elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        })
        this.loaded= true;
      }else{
        console.log("Error: ", response);
      }
    })

    this.projBindingService.dataEmitter.subscribe((data: MyProject) => {
      if(data){
          this.projList.forEach(async proj => {
            if (data.projId==proj.projId) {
            proj = data;
          }
        })
        this.projList.forEach(elem=>{
          elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        })
        this.projListBinding<Array<MyProject>>(this.projList);
        this.projListShown= this.projList.filter((elem: MyProject) => elem.projShow) || [];
        this.projList.forEach(elem=>{
          elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        })
      }
    })

    this.projListBindingService.dataEmitter.subscribe((data: Array<MyProject>)=>{
      if(data){ 
        this.projList= data;
        this.projList.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
        this.projListShown= this.projList.filter((elem: MyProject) => elem.projShow==true) || [];
        this.projList.forEach(elem=>{
          elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
        })
      }
      })
      
      // Si cambia una tech o la lista de tech visibles se reflejará en la lista de techs de cada proj
      // No es una solución elegante pero por ahora funciona.
    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>)=>{
      if(data){
        this.techListShown= data.filter(elem => elem.techShow) || [];
        let currentProjList: Array<MyProject>= this.projListShown;
        console.log("proj techListShown ", this.techListShown);
        currentProjList.forEach(proj => {
          let newTechList: Array<Technology>=[]
          //proj.techList.filter(elem=> elem.techShow) || []; //Si saco una tech con set list
          proj.techList.forEach(tech => {
            this.techListShown.forEach(techShown=>{
              if (tech.techId == techShown.techId) {
                newTechList.push(techShown)
              }
            });
          })
          console.log("proj dnewtec ", newTechList);
          proj.techList= newTechList;
          proj.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
          return proj.techList;
        })
        this.projListShown = currentProjList;
        // Debo guardar los cambios en las listas tech de los proyectos
        // Tal vez sea optimo hacerlo en tech-set-edit
        /* this.dataService.update(this.projUpdateEndPoint, this.projList).subscribe(resp=>{
          if(resp){
            this.projList= resp;
            this.projList.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
            this.projList.forEach(elem=>{
              elem.techList.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
            })
            this.projListBinding<Array<MyProject>>(this.projList);
          }else{
            console.log("Project Component says: ", resp);
          }
        }) */
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
          }, 1000);
          ini++;
        }
    return
  }

  
  openEditOneProj(i: number) {
    this.proj= this.projListShown.find(elem=> elem.projId== i) || this.proj;
    this.projBinding<MyProject>(this.proj);
    this.projTechListBinding<Array<Technology>>(this.techListShown);
    $("#editProj").modal("show");
  }
  
  openNewProj(){
    this.projTechListBinding<Array<Technology>>(this.techListShown);
    $("#newProj").modal("show");
  }
  
  openEditProjSet(){
    this.projListBinding<Array<MyProject>>(this.projList);
    $("#editProjSet").modal("show");
  }

  openDeleteProj(){
    this.projListBinding<Array<MyProject>>(this.projList);
    $("#deleteProj").modal("show");
  }

  projBinding<T>(data: T) {
    this.projBindingService.setData<T>(data);
  }

  projListBinding<T>(data: T) {
    this.projListBindingService.setData<T>(data);
  }

  projTechListBinding<T>(data: T) {
    this.projTechListBindingService.setData<T>(data);
  }

}