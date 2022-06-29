import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { AboutBindingService } from 'src/app/services/binding-services/about-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

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
    photoUrl: "",
    aboutShown: false
  });
  
  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<About>,
    private aboutBindingService: AboutBindingService<T>
    ) {
    this.about={
      aboutId: 0,
      firstName: "",
      lastName: "",
      shortExplanation: "",
      photoUrl: "",
      aboutShown: false
    }

    this.aboutBindingService.dataEmitter.subscribe((data: About) =>{
      this.about= data || this.about;
    })
  }
  
  onSubmit(){
    this.about.firstName= this.popupForm.value.firstName || this.about.firstName;
    this.about.lastName= this.popupForm.value.lastName || this.about.lastName;
    this.about.shortExplanation= this.popupForm.value.shortExplanation || this.about.shortExplanation;
    this.about.photoUrl= this.popupForm.value.photoUrl || this.about.photoUrl;
    this.about.aboutShown=true;
    this.closePopup();
    this.dataService.update(this.endPoint, this.about).subscribe(resp =>{
      if(resp){
        this.about = resp;
        this.aboutBinding<About>(this.about);
      }else{
        window.alert(`Edit About says: ${resp}`);
      }
    })
  }
  
      closePopup(){
    $("#editAbout").modal("hide");
  }

  aboutBinding<T>(data: T){
    this.aboutBindingService.setData<T>(data);
  }
  
}
