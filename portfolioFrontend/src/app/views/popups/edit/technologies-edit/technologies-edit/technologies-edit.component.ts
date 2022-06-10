import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-technologies-edit',
  templateUrl: './technologies-edit.component.html',
  styleUrls: ['./technologies-edit.component.css']
})
export class TechnologiesEditComponent<T>{

  tech: Technology;

  private endPoint: string="technology/update";

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
    private popupBindingService: PopupBindingService<Technology>,
    private techBindingService: TechBindingService<T>
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

    this.popupBindingService.dataEmitter.subscribe((data: Technology) =>{
      this.tech= data;
    })

  }

  onSubmit(){
    this.tech.techName= this.popupForm.value.techName || this.tech.techName;
    this.tech.techType= this.popupForm.value.techType || this.tech.techType;
    this.tech.techDescription= this.popupForm.value.techDescription || this.tech.techDescription;
    this.tech.techIconUrl= this.popupForm.value.techIconUrl || this.tech.techIconUrl;
    this.tech.techLevel= this.popupForm.value.techLevel || this.tech.techLevel;
    this.tech.techIndex= this.popupForm.value.techIndex || this.tech.techIndex;
    this.tech.techShow= this.tech.techShow;
    this.dataService.update(this.endPoint, this.tech).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.techBinding<Technology>(this.tech);
    this.closePopup();
    this.closePopup();
  }

  onCheckboxChange(event: boolean){
    this.tech.techShow= event;
    console.log("technologies-esdit this.tech.techShow ", this.tech.techShow);
    console.log("technologies-esdit this.popupForm.value.techShow ", this.popupForm.value.techShow);
  }

  closePopup(){
    this.techBinding<Technology>(this.tech);
    $("#editTech").modal("hide");
    this.popupForm.reset();
  }

  techBinding<T>(data: T) {
    this.techBindingService.setData<T>(data);
  }

}
