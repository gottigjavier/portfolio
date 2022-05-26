import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MyProject } from 'src/app/models/my-project.model';
import { Technology } from 'src/app/models/technology.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent<T>{

  proj: MyProject;
  
  public techListAll: Array<Technology>=[];
  public techListTrue: Array<Technology>=[];
  public techListTrueStr: Array<string>=[];
  public techListFalse: Array<Technology>=[];
  
  private projEndPoint: string="my-project/update";
  private techEndPoint: string="technology/list";
  
  insideForm: FormGroup;
  popupForm: FormGroup;
  techList: FormArray;

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.techList.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.techList.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.techList.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<MyProject>
  ) {
    this.proj={
    projId: 0,
    projName: "",
    projDescription: "",
    projUrl: "",
    techList: [],
    projIndex: 0
    }

    this.insideForm=this.fb.group({techList: this.fb.array([])});
    this.techList= this.insideForm.get('techList') as FormArray;


    this.popupForm= this.fb.group({
      projName: "",
      projDescription: "",
      projUrl: "",
      techList: this.fb.array([]),
    })

    this.service.getAll<Array<Technology>>(this.techEndPoint).subscribe(response =>{
      this.proj.techList.length=0;
      this.binding.dataEmitter.subscribe((data: MyProject) =>{
        this.proj= data;
        this.techListAll= response;
        this.checkedList(this.proj.techList, this.techListAll);
        this.techListTrueStr.forEach(elem=>{
          this.techList.push(new FormControl(elem));
        })
      })
    })

  } //end constructor

  insideSubmit(): Array<Technology>{
    this.proj.techList.length=0;
    this.techList.value.forEach((element: number) => {
      if(element!=null){
        
        this.proj.techList.push(this.techListAll.filter(el => el.techId==element)[0]);
      }
    });
    return this.proj.techList;
  }
  
  checkedList(proj: Array<Technology>, techListAll:Array<Technology>){
    this.techListFalse= techListAll;
    techListAll.forEach(elemAll =>{
      try{
        proj.forEach(elemProj =>{
          if(elemAll.techId==elemProj.techId){
            this.techListTrue.push(elemAll)
            this.techListTrueStr.push(elemAll.techId.toString())
            this.techListFalse= this.techListFalse.filter(elem => elem.techId!==elemProj.techId)
          }
        })
      }catch{
        console.log("Error in checkedList(), Array of Technologies");
      }
    })
  }
  
  onSubmit(){
      this.proj.techList= this.insideSubmit();
      this.proj.projName= this.popupForm.value.projName || this.proj.projName;
      this.proj.projDescription= this.popupForm.value.projDescription || this.proj.projDescription;
      this.proj.projUrl= this.popupForm.value.projUrl || this.proj.projUrl;
      this.proj.projIndex= this.popupForm.value.projIndex || this.proj.projIndex;
      this.service.update(this.projEndPoint, this.proj).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    
    this.closePopup();
  }

  closePopup(){
    this.techListFalse.length=0;
    this.techListTrue.length=0;
    this.techListTrueStr.length=0;
    this.insideForm.reset();
    $("#editProj").modal("hide");
  }

}
