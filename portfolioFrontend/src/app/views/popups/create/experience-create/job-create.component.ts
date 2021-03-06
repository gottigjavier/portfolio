import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent<T> implements OnInit{

  public job: JobExperience;

  private jobList: Array<JobExperience>=[];
  
  private createJobEndPoint: string="job-experience";

  popupForm= this.fb.group({
    companyName:"",
    companyActivity:"",
    companyLink:"",
    companyLogoUrl:"",
    jobPosition:"",
    jobDuties:"",
    lessonsLearned:"",
    jobStart:"",
    jobEnd:"",
    jobIndex:99,
    jobShow:true
  });
  
  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private jobListBindingService: JobListBindingService<Array<JobExperience>>
    ) {
    this.job={
      jobId: 0,
      jobPosition:"",
      jobDuties:"",
      lessonsLearned:"",
      companyName:"",
      companyActivity:"",
      companyLink:"",
      companyLogoUrl:"",
      jobStart:"",
      jobEnd:"",
      jobIndex:0,
      jobShow: true
    }

  }

  ngOnInit(): void {
    this.jobListBindingService.dataEmitter.subscribe((data: Array<JobExperience>)=>{
      this.jobList= data;
    })
  }
  
  onSubmit(){
    if(!this.popupForm.value.companyLogoUrl.startsWith("http")){
      window.alert(`"${this.popupForm.value.companyLogoUrl}" is not valid url. Default url will be used.`);
      this.job.companyLogoUrl= "https://i.imgur.com/FpQreWg.jpeg";
    }else{
      this.job.companyLogoUrl= this.popupForm.value.companyLogoUrl || this.job.companyLogoUrl;
    }
    if(!this.popupForm.value.companyLink.startsWith("http")){
      window.alert(`"${this.popupForm.value.companyLink}" is not valid url. Default url will be used.`);
      this.job.companyLink= "#";
    }else{
      this.job.companyLink= this.popupForm.value.companyLink || this.job.companyLink;
    }
    this.job.companyName= this.popupForm.value.companyName || this.job.companyName;
    this.job.companyActivity= this.popupForm.value.companyActivity || this.job.companyActivity;
    this.job.jobPosition= this.popupForm.value.jobPosition || this.job.jobPosition;
    this.job.jobDuties= this.popupForm.value.jobDuties || this.job.jobDuties;
    this.job.lessonsLearned= this.popupForm.value.lessonsLearned || this.job.lessonsLearned;
    this.job.jobStart= this.popupForm.value.jobStart || this.job.jobStart;
    this.job.jobEnd= this.popupForm.value.jobEnd || this.job.jobEnd;
    this.job.jobIndex= this.popupForm.value.jobIndex || this.job.jobIndex;
    this.job.jobShow= this.popupForm.value.jobShow || this.job.jobShow;
    this.jobList.push(this.job);
    this.jobListBinding<Array<JobExperience>>(this.jobList); // Optimistic
    this.closePopup();
    this.dataService.create(this.createJobEndPoint, this.job).subscribe(resp =>{
      if(resp){
        this.jobList= Object.values(resp); // From ResponseEntity
        this.jobListBinding<Array<JobExperience>>(this.jobList); // From db
        this.popupForm.reset();
      }else{
        window.alert(`Create Job Experience says: ${resp}`);
      }
    })
  }
  
  closePopup(){
    $("#newJob").modal("hide");
  }

  jobListBinding<T>(data: T){
    this.jobListBindingService.setData<T>(data);
  }
}
