import { Component, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/models/job-experience.model';
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
    private popupBindingService: PopupBindingService<JobExperience>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<JobExperience>>(this.endPoint).subscribe(response => {
      console.log("Job Experience -> ", response);
      response.sort((a,b) => a.jobIndex - b.jobIndex);
      this.jobList = response;
      })
  }

  openEdit(i: number){
    this.popupBinding<JobExperience>(this.jobList[i]);
    $("#editJob").modal("show");
  }
  
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

}
