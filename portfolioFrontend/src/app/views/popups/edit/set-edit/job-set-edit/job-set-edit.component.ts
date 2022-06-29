import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-job-set-edit',
  templateUrl: './job-set-edit.component.html',
  styleUrls: ['./job-set-edit.component.css']
})
export class JobSetEditComponent<T> implements OnInit {

  private jobUpdateListEndPoint: string="job-experience/update/list";

  public jobListAll: Array<JobExperience>=[];
  public jobListTrue: Array<JobExperience>=[];
  public jobListFalse: Array<JobExperience>=[];
  private jobListToSend: Array<JobExperience>=[];
  private jobSetChanged: Set<number>=new Set();
  private job: JobExperience={
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

  setForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    this.jobSetChanged.add(e.target.value)
    this.job = this.jobListAll.find(elem => elem.jobId == e.target.value)|| this.job;
    if(this.job.jobShow){
      this.job.jobShow= false;
      this.jobListTrue= this.jobListTrue.filter(elem => elem.jobId != this.job.jobId) || [];
      this.jobListFalse.push(this.job); 
    }else if(!this.job.jobShow){
      this.job.jobShow= true;
      this.jobListFalse= this.jobListFalse.filter(elem => elem.jobId != this.job.jobId) || [];
      this.jobListTrue.push(this.job); 
    }
  }

  onIndexChange(e:any){
    this.jobSetChanged.add(e.target.id);
    this.jobListTrue.forEach(elem=>{
      if(elem.jobId==e.target.id){
        elem.jobIndex=e.target.value;
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private jobListBindingService: JobListBindingService<Array<JobExperience>>
  ) {
    
    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  }

  ngOnInit(): void {
    this.jobListBindingService.dataEmitter.subscribe((data: Array<JobExperience>)=>{
      this.jobListAll= data;
      this.jobListAll.sort((a: JobExperience, b: JobExperience): number => a.jobIndex - b.jobIndex);
      this.jobListTrue= this.jobListAll.filter(elm => elm.jobShow) || [];
      this.jobListFalse= this.jobListAll.filter(elm => !elm.jobShow) || [];
    })
  }

  setSubmit(){
    // Enviar la lista al backend y que él se encargue de actualizar cada uno
      for(let item of this.jobSetChanged){
        console.log("item set", item);
        this.jobListAll.forEach(sendJob =>{
          if(sendJob.jobId==item){
            this.jobListToSend.push(sendJob);
          }
        })
      }
          this.closePopup();
          this.service.update(this.jobUpdateListEndPoint, this.jobListToSend).subscribe(resp=>{
            if(resp){
              this.jobListAll = Object.values(resp);
              this.jobListBinding<Array<JobExperience>>(this.jobListAll);
            }else{
              window.alert(`Edit Job Experience Set says: ${resp}`);
            }
          })
    }
    
    
    closePopup(){
    $("#editJobSet").modal("hide");
  }

  
  jobListBinding<T>(data: T){
    this.jobListBindingService.setData<T>(data);
  }
}
