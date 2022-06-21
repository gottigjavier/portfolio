import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-tech-create',
  templateUrl: './tech-create.component.html',
  styleUrls: ['./tech-create.component.css']
})
export class TechCreateComponent<T> {

  private techList: Array<Technology>=[];

  private tech={
    techName: "No Name",
    techType: "No Type",
    techIconUrl: "",
    techDescription: "No Description",
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
    private dataService: DataService<T>,
    private techListBindingService: TechListBindingService<Array<Technology>>
  ) { }

  onSubmit(){
    if(!this.popupForm.value.techIconUrl || !this.popupForm.value.techIconUrl.startsWith("http")){
      window.alert(`"${this.popupForm.value.techIconUrl}" is not valid url. Default url will be used.`);
      this.tech.techIconUrl= "https://i.imgur.com/FpQreWg.jpeg";
    }else{
      this.tech.techIconUrl= this.popupForm.value.techIconUrl || this.tech.techIconUrl;
    }
    this.tech.techName= this.popupForm.value.techName || this.tech.techName;
    this.tech.techType= this.popupForm.value.techType || this.tech.techType;
    this.tech.techDescription= this.popupForm.value.techDescription || this.tech.techDescription;
    this.tech.techLevel= this.popupForm.value.techLevel || this.tech.techLevel;
    this.tech.techIndex= this.popupForm.value.techIndex || this.tech.techIndex;
    this.tech.techShow= true;
    this.dataService.create(this.endPoint, this.tech).subscribe(resp =>{
      if(resp.statusCodeValue == 200){
        this.techList = Object.values(resp.body);
        this.techListBinding<Array<Technology>>(this.techList);
        this.closePopup();
      }else{
        window.alert(`Error: ${resp.statusCode}`);
      }
    })
    //window.location.reload();
  }

  closePopup(){
    this.popupForm.reset();
    $("#newTech").modal("hide");
  }

  techListBinding<T>(data: T) {
    this.techListBindingService.setData<T>(data);
  }
}
