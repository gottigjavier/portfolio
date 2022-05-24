import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent<T> {

  job: JobExperience;
  
  private endPoint: string="job-experience/update";

  popupForm= this.fb.group({
    companyName: "",
    companyLogoUrl: "",
    companyActivity: "",
    companyLink: "",
    jobPosition: "",
    jobDuties: "",
    lessonsLearned: "",
    jobStart: "",
    jobEnd: "",
    jobIndex: 0
  })
  
  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<JobExperience>
  ) {
    this.job={
    jobId: 0,
    companyName: "",
    companyLogoUrl: "",
    companyActivity: "",
    companyLink: "",
    jobPosition: "",
    jobDuties: "",
    lessonsLearned: "",
    jobStart: "",
    jobEnd: "",
    jobIndex: 0
    }

    this.binding.dataEmitter.subscribe((data: JobExperience) =>{
      this.job= data;
    })
  
  }


  onSubmit(){
    this.job.companyName= this.popupForm.value.companyName || this.job.companyName;
    this.job.companyLink= this.popupForm.value.companyLink || this.job.companyLink;
    this.job.companyLogoUrl= this.popupForm.value.companyLogoUrl || this.job.companyLogoUrl;
    this.job.companyActivity= this.popupForm.value.companyActivity || this.job.companyActivity;
    this.job.jobPosition= this.popupForm.value.jobPosition || this.job.jobPosition;
    this.job.jobDuties= this.popupForm.value.jobDuties || this.job.jobDuties;
    this.job.lessonsLearned= this.popupForm.value.lessonsLearned || this.job.lessonsLearned;
    this.job.jobStart= this.popupForm.value.jobStart || this.job.jobStart;
    this.job.jobEnd= this.popupForm.value.jobEnd || this.job.jobEnd;
    this.service.update(this.endPoint, this.job).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
  }

  closePopup(){
    $("#editJob").modal("hide");
  }

}
