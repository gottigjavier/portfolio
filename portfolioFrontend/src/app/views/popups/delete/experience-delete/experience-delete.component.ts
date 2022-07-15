import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience-delete',
  templateUrl: './experience-delete.component.html',
  styleUrls: ['./experience-delete.component.css']
})
export class ExperienceDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "job-experience";

  public deleteForm: FormGroup;

  public jobList: Array<JobExperience>=[];
  private jobToDelete: JobExperience;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private jobListBindingService: JobListBindingService<Array<JobExperience>>
  ) {
    this.deleteForm = this.formBilder.group({
      jobId: ""
    });

    this.jobToDelete={
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

    this.jobListBindingService.dataEmitter.subscribe((data: Array<JobExperience>)=>{
      this.jobList= Object.values(data);
    })
  }

  ngOnInit(): void {
  }

  delSubmit(){
    this.jobList.forEach(elem => {
        if(elem.jobId == this.deleteForm.value.jobId){
          this.jobToDelete=elem;
          return
        }
      })
        if(this.jobToDelete.jobId<0){
          window.alert("Id mismatch");
        }else{
          this.closePopup();
          this.dataService.delete(`${this.deleteEndPoint}/${this.jobToDelete.jobId}`).subscribe(resp =>{
            if(resp){
              this.jobList.length=0;
              this.jobList= Object.values(resp);
              this.jobListBinding<Array<JobExperience>>(this.jobList);
              this.deleteForm.reset();
            }else{
              window.alert(`Delete Job Experience says: ${resp}`);
            }
          })
        }
  }
  

  closePopup(){
    $("#deleteJob").modal("hide");
  }

  jobListBinding<T>(data: T) {
    this.jobListBindingService.setData<T>(data);
  }


}
