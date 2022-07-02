import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.css']
})
export class TechnologyEditComponent<T> implements OnInit{

  public tech: Technology;
  private techList: Array<Technology>=[];
  
  private techUpdateEndPoint: string="technology/update";

  popupForm= this.fb.group({
    techName: "",
    techType: "",
    techDescription: "",
    techIconUrl: "",
    techLevel: 0,
    techIndex: 0,
    techShow: true
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<T>,
    private techBindingService: TechBindingService<Technology>,
    private techListBindingService: TechListBindingService<Array<Technology>>
  ) {
    this.tech={
    techId: 0,
    techName: "",
    techType: "",
    techIconUrl: "",
    techDescription: "",
    techLevel: 0,
    techIndex: 0,
    techShow: false
  }

  /*
  this.dataService.getOne("technology/91").subscribe(data => {
    console.log("tech edit get one data ", data);
  }) */
  
}

ngOnInit(): void {
    this.techBindingService.dataEmitter.subscribe((data: Technology) =>{
      this.tech= data;
    })
    
    this.techListBindingService.dataEmitter.subscribe((data: Array<Technology>)=>{
      this.techList= data;
    })
    
  }

  onTSubmit(){
    this.tech.techName= this.popupForm.value.techName || this.tech.techName;
    this.tech.techType= this.popupForm.value.techType || this.tech.techType;
    this.tech.techDescription= this.popupForm.value.techDescription || this.tech.techDescription;
    this.tech.techIconUrl= this.popupForm.value.techIconUrl || this.tech.techIconUrl;
    this.tech.techLevel= this.popupForm.value.techLevel || this.tech.techLevel;
    this.tech.techIndex= this.popupForm.value.techIndex || this.tech.techIndex;
    this.closeTPopup();
    // Optimistic
    this.techList.forEach(elem=>{
      if(elem.techId==this.tech.techId){
        elem= this.tech;
      }
    })
    this.techListBinding<Array<Technology>>(this.techList);
    this.dataService.update(this.techUpdateEndPoint, this.tech).subscribe(resp =>{
      if(resp){
        this.tech = resp;
        this.techList.forEach(elem=>{
          if(elem.techId==this.tech.techId){
            elem= this.tech;
          }
        })
        //this.popupForm.reset();
        this.techListBinding<Array<Technology>>(this.techList);
      }else{
        window.alert(`Edit Technology says: ${resp}`);
      }
    })
  }

  closeTPopup(){
    $("#editTech").modal("hide");
  }

  techBinding<T>(data: T) {
    this.techBindingService.setData<T>(data);
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }

}
