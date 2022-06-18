import { Component, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/models/job-experience.model';
import { JobListBindingService } from 'src/app/services/binding-services/job-list-binding.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
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
    private popupBindingService: PopupBindingService<T>,
    private jobListBindingService: JobListBindingService<T>
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
    this.popupBinding<JobExperience>(this.jobList[i]);
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
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

  jobListBinding<T>(data: T){
    this.jobListBindingService.setData<T>(data);
  }

}
