import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about-create',
  templateUrl: './about-create.component.html',
  styleUrls: ['./about-create.component.css']
})
export class AboutCreateComponent<T> implements OnInit{

  public about: About;
  private aboutList: Array<About>=[];

  private createAboutEndPoint: string="about";

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
    private aboutListBindingService: AboutListBindingService<Array<About>>
    ) {
    this.about={
      aboutId: 0,
      firstName: "",
      lastName: "",
      shortExplanation: "",
      photoUrl: "",
      aboutShown: false
    }

  }

  ngOnInit(): void {
    this.aboutListBindingService.dataEmitter.subscribe((data:Array<About>)=>{
      this.aboutList= data;
    })
  }
  
  onSubmit(){
    if(!this.popupForm.value.photoUrl.startsWith("http")){
      this.about.photoUrl= "https://i.imgur.com/FpQreWg.jpeg";
      window.alert(`"${this.popupForm.value.photoUrl}" is not valid url. Default url will be used.`);
    }else{
      this.about.photoUrl= this.popupForm.value.photoUrl || this.about.photoUrl;
    }
    this.about.firstName= this.popupForm.value.firstName || this.about.firstName;
    this.about.lastName= this.popupForm.value.lastName || this.about.lastName;
    this.about.shortExplanation= this.popupForm.value.shortExplanation || this.about.shortExplanation;
    this.dataService.create(this.createAboutEndPoint, this.about).subscribe(resp =>{
    this.closePopup();
    this.aboutList.push(this.about);
    this.aboutListBinding<Array<About>>(this.aboutList); // Optimistic
      if(resp){
        this.aboutList= Object.values(resp); // From ResponseEntity
        this.aboutListBinding<Array<About>>(this.aboutList); // from db
        this.popupForm.reset();
      }else{
        window.alert(`Create About says: ${resp}`);
      }
    })
  }
  
  closePopup(){
    $("#newAbout").modal("hide");
  }

  aboutListBinding<T>(data: T){
    this.aboutListBindingService.setData<T>(data);
  }
}
