import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
export class ProjectsEditComponent<T> implements OnInit{

  proj: MyProject;
  public techListAll: Array<Technology>=[];
  
  private projEndPoint: string="my-project/update";
  private techEndPoint: string="technology/list";

  popupForm= this.fb.group({
    projName: "",
    projDescription: "",
    projUrl: "",
    techList: [this.techListAll],
  })

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

    this.binding.dataEmitter.subscribe((data: MyProject) =>{
      this.proj= data;
    })
  
  }

  ngOnInit(): void {
    this.service.getAll<Array<Technology>>(this.techEndPoint).subscribe(response =>{
      this.techListAll= response;
      console.log("ttttttttttttt ", this.techListAll);
    })
  }

  onSubmit(){
//    this.job.companyName= this.popupForm.value.companyName || this.job.companyName;
    this.service.update(this.projEndPoint, this.proj).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
  }

  closePopup(){
    $("#editProj").modal("hide");
  }

}
