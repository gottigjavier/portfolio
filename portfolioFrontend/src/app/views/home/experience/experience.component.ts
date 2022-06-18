import { Component, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobBindingService } from 'src/app/services/binding-services/job-binding.service';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent<T> implements OnInit {

  public jobList: Array<JobExperience>=[];

  private endPoint: string= "job-experience/list";

  public editMode: boolean= false;  

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private jobBindingService: JobBindingService<JobExperience>,
    private jobListBindingService: JobListBindingService<Array<JobExperience>>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })

      this.jobListBindingService.dataEmitter.subscribe((data: Array<JobExperience>) =>{
        this.jobList= data;
        if(Array.isArray(this.jobList)){
          this.jobList.sort((a: JobExperience, b: JobExperience): number => a.jobIndex - b.jobIndex);
        }
      })

    }

  ngOnInit(): void {
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response.statusCode == "OK"){
        let list: Array<JobExperience>= Object.values(response.body);
        this.jobList = list;
        if(Array.isArray(this.jobList)){
          this.jobList.sort((a: JobExperience, b: JobExperience): number => a.jobIndex - b.jobIndex);
        }
      }else{
        window.alert(`Error: ${response.statusCode}`);
      }
      })
  }

  openEditOne(i: number){
    this.jobBinding<JobExperience>(this.jobList[i]);
    $("#editJob").modal("show");
  }

  openNewJob(){
    $("#newJob").modal("show");
  }
  
  openEditJobSet(){

  }

  openDeleteJob(){
    this.jobListBinding<Array<JobExperience>>(this.jobList);
    $("#deleteJob").modal("show");
  }

  jobBinding<T>(data: T){
    this.jobBindingService.setData<T>(data);
  }

  jobListBinding<T>(data: T){
    this.jobListBindingService.setData<T>(data);
  }

}
