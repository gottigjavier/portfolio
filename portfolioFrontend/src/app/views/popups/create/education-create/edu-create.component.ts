import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-edu-create',
  templateUrl: './edu-create.component.html',
  styleUrls: ['./edu-create.component.css']
})
export class EduCreateComponent<T> implements OnInit {

  public edu: Education;
  private eduList: Array<Education>=[];

  private createEduEndPoint: string="education/create";

  popupForm= this.fb.group({
    institutionName: "",
    institutionLink: "",
    institutionLogo: "",
    educationCareer: "",
    educationType: "",
    educationStart: "",
    educationEnd: "",
    approvedLevel: 30,
    eduIndex: 99
  })

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private eduListBindingService: EduListBindingService<Education>
  ) {
    this.edu={
      educationId: 0,
      educationCareer: "",
      educationType: "",
      educationStart: "",
      educationEnd: "",
      approvedLevel: 30,
      institutionName: "",
      institutionLink: "",
      institutionLogo: "",
      eduShow: true,
      eduIndex: 0
    }
  }

  onSubmit(){
    this.edu.institutionName= this.popupForm.value.institutionName || this.edu.institutionName;
    this.edu.institutionLink= this.popupForm.value.institutionLink || this.edu.institutionLink;
    this.edu.institutionLogo= this.popupForm.value.institutionLogo || this.edu.institutionLogo;
    this.edu.educationCareer= this.popupForm.value.educationCareer || this.edu.educationCareer;
    this.edu.educationType= this.popupForm.value.educationType || this.edu.educationType;
    this.edu.educationStart= this.popupForm.value.educationStart || this.edu.educationStart;
    this.edu.educationEnd= this.popupForm.value.educationEnd || this.edu.educationEnd;
    this.edu.approvedLevel= this.popupForm.value.approvedLevel || this.edu.approvedLevel;
    this.dataService.create(this.createEduEndPoint, this.edu).subscribe(resp =>{
      if(resp.statusCode == "OK"){
      let list: Array<Education>= Object.values(resp.body);
      this.eduList= list;
      this.eduListBinding<Array<Education>>(this.eduList);
    }else{
      window.alert(`Error: ${resp.statusCode}`);
    }
    })
  }

  ngOnInit(): void {
  }

  closePopup(){
    $("#newEdu").modal("hide");
  }

  eduListBinding<T>(data: T){
    this.eduListBindingService.setData<T>(data);
  }

}
