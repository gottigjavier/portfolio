import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience-delete',
  templateUrl: './experience-delete.component.html',
  styleUrls: ['./experience-delete.component.css']
})
export class ExperienceDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "job-experience/delete";

  public deleteForm: FormGroup;

  public jobList: Array<JobExperience>=[];
  private jobToDelete: JobExperience;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<T>,
    private jobListBindingService: JobListBindingService<T>
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
          this.dataService.delete(`${this.deleteEndPoint}/${this.jobToDelete.jobId}`).subscribe(resp =>{
            if(resp.statusCode == "OK"){
              let list: Array<JobExperience>= Object.values(resp.body);
              this.jobList= list;
              this.jobListBinding<Array<JobExperience>>(this.jobList);
            }else{
              window.alert(`Error: ${resp.statusCode}`);
            }
          })
          this.closePopup();
        }
  }
  

  closePopup(){
    this.jobList.length=0;
    this.deleteForm.reset();
    $("#deleteJob").modal("hide");
  }

  jobListBinding<T>(data: T) {
    this.jobListBindingService.setData<T>(data);
  }


}
