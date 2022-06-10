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

  public deleteForm: FormGroup;

  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private techListBindingService: TechListBindingService<T>
  ) {
    this.deleteForm = this.formBilder.group({
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
    this.dataService.getAll<Array<Technology>>(this.listEndPoint).subscribe(response =>{
      this.techListAll= response;
    })
  }

  delSubmit(){
    this.techListAll.forEach(elem => {
        if(elem.techId == this.deleteForm.value.techId){
          this.techToDelete=elem;
          return
        }
      })
        if(this.techToDelete.techId<0){
          window.alert("Id not match");
        }else{
          this.dataService.delete(`${this.deleteEndPoint}/${this.techToDelete.techId}`).subscribe(resp =>{
            this.techListAll= resp;
          })
          // Con dos closePopup se actualizan los componentes
          this.techListBinding<Array<Technology>>(this.techListAll);
          this.ngOnInit();
        this.closePopup();
        this.closePopup();
        this.closePopup();
        }
  }
  
  closePopup(){
    this.techListBinding<Array<Technology>>(this.techListAll);
    this.techToDelete=this.emptyTech;
    this.deleteForm.reset();
    $("#deleteTech").modal("hide");
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}
