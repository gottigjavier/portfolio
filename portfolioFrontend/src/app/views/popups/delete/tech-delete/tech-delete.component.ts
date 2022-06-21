import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-tech-delete',
  templateUrl: './tech-delete.component.html',
  styleUrls: ['./tech-delete.component.css']
})
export class TechDeleteComponent<T> implements OnInit {

  private listEndPoint: string = "technology/list";
  private deleteEndPoint: string = "technology/delete";

  public techListAll: Array<Technology>=[];
  public techToDelete: Technology;
  private emptyTech: Technology;

  public deleteTForm: FormGroup;

  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private techListBindingService: TechListBindingService<Array<Technology>>
  ) {
    this.deleteTForm = this.formBilder.group({
      techId: ""
    });

    this.emptyTech={
      techId:-1,
      techName:"",
      techDescription:"",
      techType:"",
      techIconUrl:"",
      techIndex:0,
      techLevel:0,
      techShow:false
    };
    this.techToDelete=this.emptyTech;

  }
  
  ngOnInit(): void {
    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>)=>{
      this.techListAll= data;
    })
  }

  delSubmit(){
        this.techToDelete= this.techListAll.find((elem: Technology)=> elem.techId == this.deleteTForm.value.techId) || this.techToDelete;
        if(this.techToDelete.techId<0){
          window.alert("Id mismatch");
        }else{
          this.dataService.delete(`${this.deleteEndPoint}/${this.techToDelete.techId}`).subscribe(resp =>{
            console.log("tech error ", resp.error)
            if(resp.statusCodeValue != 200){
              window.alert("error");
            }else{
              this.techListAll= resp.body;
              console.log("tech delete resp ", this.techListAll);
              this.techListBinding<Array<Technology>>(this.techListAll);
              //this.techListBinding<Array<Technology>>(this.techListAll);
              this.closePopup();
            }
          })
        }
      }
      
  closePopup(){
    this.techToDelete=this.emptyTech;
    this.deleteTForm.reset();
    //this.techListAll.length=0;
    $("#deleteTech").modal("hide");
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}
