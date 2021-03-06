import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyProject } from 'src/app/models/my-project.model';
import { ProjListBindingService } from 'src/app/services/binding-services/proj-list-binding-service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-proj-delete',
  templateUrl: './proj-delete.component.html',
  styleUrls: ['./proj-delete.component.css']
})
export class ProjDeleteComponent<T> implements OnInit{


  private deleteProjEndPoint: string= "my-project";

  public projList: Array<MyProject>=[];

  public deleteForm: FormGroup;

  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private projListBindingService: ProjListBindingService<Array<MyProject>>
  ) {
    this.deleteForm = this.formBilder.group({
      projId: ""
    });

  }

  ngOnInit(): void {
    this.projListBindingService.dataEmitter.subscribe((data: Array<MyProject>)=>{
      this.projList= data;
    })  
  }
  
  delSubmit(): void {
    let invalid: boolean=true;
    this.projList.forEach(elem=>{
      if(elem.projId ==this.deleteForm.value.projId){
        invalid=false;
      }
      })
      if(invalid){
      alert("Id mismatch");
    }else{
      this.projList = this.projList.filter(elem=> elem.projId!=this.deleteForm.value.projId);
      this.projListBinding<Array<MyProject>>(this.projList);
      this.closePopup();
      this.dataService.delete(`${this.deleteProjEndPoint}/${this.deleteForm.value.projId}`).subscribe(resp=>{
        if(resp){
          this.projList= Object.values(resp);
          this.projList.sort((a: MyProject, b: MyProject): number => a.projIndex - b.projIndex);
          this.projListBinding<Array<MyProject>>(this.projList);
          this.deleteForm.reset();
        }else{
          window.alert(`Delete Project says: ${resp}`);
        }
      })
    }
  }

  closePopup(){
    //this.projList.length=0;
    $("#deleteProj").modal("hide");
  }

  projListBinding<T>(data: T) {
    this.projListBindingService.setData<T>(data);
  }


}
