import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobBindingService } from 'src/app/services/binding-services/job-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent<T> {

  public job: JobExperience;
  
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
    private dataService: DataService<T>,
    //private popupBindingService: PopupBindingService<JobExperience>,
    private jobBindingService: JobBindingService<JobExperience>
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
    jobShow: true,
    jobIndex: 0
    }

    this.jobBindingService.dataEmitter.subscribe((data: JobExperience) =>{
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
    this.closePopup();
    this.dataService.update(this.endPoint, this.job).subscribe(resp =>{
      if(resp){
        this.job = resp;
        this.jobBinding<JobExperience>(this.job);
      }else{
        window.alert(`Edit Job Experience says: ${resp}`);
      }
    })
  }

  closePopup(){
    $("#editJob").modal("hide");
  }

  jobBinding<T>(data: T){
    this.jobBindingService.setData<T>(data);
  }

}
