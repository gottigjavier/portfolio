import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';


declare var $ : any;

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent<T>{

  public about: About;

  private endPoint: string="about/update";

  popupForm= this.fb.group({
    firstName: "",
    lastName: "",
    shortExplanation: "",
    photoUrl: ""
  });
  
  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<About>
    ) {
    this.about={
      aboutId: 0,
      firstName: "",
      lastName: "",
      shortExplanation: "",
      photoUrl: ""
    }

    this.binding.dataEmitter.subscribe((data: About) =>{
      this.about= data;
    })
  }

  
  onSubmit(){
    this.about.firstName= this.popupForm.value.firstName || this.about.firstName;
    this.about.lastName= this.popupForm.value.lastName || this.about.lastName;
    this.about.shortExplanation= this.popupForm.value.shortExplanation || this.about.shortExplanation;
    this.about.photoUrl= this.popupForm.value.photoUrl || this.about.photoUrl;
    this.service.update(this.endPoint, this.about).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    console.log("first name popup depues de send ",this.about.firstName);
    this.closePopup();
  }
  
      closePopup(){
    $("#editAbout").modal("hide");
  }
  
}
