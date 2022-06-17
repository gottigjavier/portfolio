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
    private techListBindingService: TechListBindingService<T>
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
    this.dataService.getAll(this.listEndPoint).subscribe((response: any) =>{
      this.techListAll= response.body;
    })
  }

  delSubmit(){
    this.techListAll.forEach(elem => {
        if(elem.techId == this.deleteTForm.value.techId){
          this.techToDelete=elem;
          return
        }
      })
        if(this.techToDelete.techId<0){
          window.alert("Id mismatch");
        }else{
          this.dataService.delete(`${this.deleteEndPoint}/${this.techToDelete.techId}`).subscribe(resp =>{
            if(resp.statusCode == "OK"){
              let list: Array<Technology>= Object.values(resp.body);
              this.techListAll= list;
              this.techListAll.sort((a: Technology, b: Technology): number => a.techIndex - b.techIndex);
              this.techListBinding<Array<Technology>>(this.techListAll);
            }else{
              window.alert(`Error: ${resp.statusCode}`);
            }
          })
          this.closePopup();
        }
  }
  
  closePopup(){
    this.techToDelete=this.emptyTech;
    this.deleteTForm.reset();
    $("#deleteTech").modal("hide");
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}
