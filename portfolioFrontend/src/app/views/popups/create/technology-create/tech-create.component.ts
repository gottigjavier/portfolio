import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-tech-create',
  templateUrl: './tech-create.component.html',
  styleUrls: ['./tech-create.component.css']
})
export class TechCreateComponent<T> {

  tech={
    techName: "",
    techType: "",
    techIconUrl: "",
    techDescription: "",
    techLevel: 1,
    techIndex: 99,
    techShow: true
  };

  private endPoint: string="technology/create";

  popupForm= this.fb.group({
    techName: "",
    techType: "",
    techDescription: "",
    techIconUrl: "",
    techLevel: 1,
    techIndex: 99
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>
  ) { }

  onSubmit(){
    this.tech.techName= this.popupForm.value.techName || this.tech.techName;
    this.tech.techType= this.popupForm.value.techType || this.tech.techType;
    this.tech.techDescription= this.popupForm.value.techDescription || this.tech.techDescription;
    this.tech.techIconUrl= this.popupForm.value.techIconUrl || this.tech.techIconUrl;
    this.tech.techLevel= this.popupForm.value.techLevel || this.tech.techLevel;
    this.tech.techIndex= this.popupForm.value.techIndex || this.tech.techIndex;
    this.tech.techShow= true;
    this.dataService.create(this.endPoint, this.tech).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
    this.closePopup();
    //window.location.reload();
  }

  closePopup(){
    this.popupForm.reset();
    $("#newTech").modal("hide");
  }
}
