import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

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
  })

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<Technology>
  ) {
    this.tech={
    techId: 0,
    techName: "",
    techType: "",
    techIconUrl: "",
    techDescription: "",
    techLevel: 0,
    techIndex: 0
  }

    this.binding.dataEmitter.subscribe((data: Technology) =>{
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
    this.service.update(this.endPoint, this.tech).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
  }

  closePopup(){
    $("#editTech").modal("hide");
  }

}
