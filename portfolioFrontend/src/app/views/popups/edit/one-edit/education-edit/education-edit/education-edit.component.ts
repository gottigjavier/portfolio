import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { EduBindingService } from 'src/app/services/binding-services/edu-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;
@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent<T> implements OnInit{

  public education: Education={
    educationId: 0,
    educationCareer: "",
    educationType: "",
    educationStart: "",
    educationEnd: "",
    approvedLevel: 100,
    institutionName: "",
    institutionLink: "",
    institutionLogo: "",
    eduShow: true,
    eduIndex: 0
  };
  
  private endPoint: string="education";

  popupForm= this.fb.group({
      institutionName: "",
      institutionLink: "",
      institutionLogo: "",
      educationCareer: "",
      educationType: "",
      educationStart: "",
      educationEnd: "",
      approvedLevel: 0,
      eduIndex: 0
  });

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private eduBindingService: EduBindingService<Education>
  ) { }
  
  
  ngOnInit(): void {
    this.eduBindingService.dataEmitter.subscribe((data: Education) =>{
      this.education= data;
    })
  }

  onSubmit(){
    this.education.institutionName= this.popupForm.value.institutionName || this.education.institutionName;
    this.education.institutionLink= this.popupForm.value.institutionLink || this.education.institutionLink;
    this.education.institutionLogo= this.popupForm.value.institutionLogo || this.education.institutionLogo;
    this.education.educationCareer= this.popupForm.value.educationCareer || this.education.educationCareer;
    this.education.educationType= this.popupForm.value.educationType || this.education.educationType;
    this.education.educationStart= this.popupForm.value.educationStart || this.education.educationStart;
    this.education.educationEnd= this.popupForm.value.educationEnd || this.education.educationEnd;
    this.education.approvedLevel= this.popupForm.value.approvedLevel || this.education.approvedLevel;
    this.closePopup();
    this.eduBinding<Education>(this.education);
    this.dataService.update(this.endPoint, this.education).subscribe(resp =>{
      if(resp){
        this.education = resp;
        this.eduBinding<Education>(this.education);
      }else{
        window.alert(`Edit Education says: ${resp}`);
      }
    })
  }
  
      closePopup(){
    $("#editEdu").modal("hide");
  }

  eduBinding<T>(data: T){
    this.eduBindingService.setData<T>(data);
  }

}
