import { Component, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/models/job-experience.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent<T> implements OnInit {

  public jobList: Array<JobExperience>=[];

  private endPoint: string= "job-experience/list";
  

  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<JobExperience>
    ) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<JobExperience>>(this.endPoint).subscribe(response => {
      console.log("Job Experience -> ", response);
      response.sort((a,b) => a.jobIndex - b.jobIndex);
      this.jobList = response;
      })
  }

  openEdit(i: number){
    this.binding<JobExperience>(this.jobList[i]);
    $("#editJob").modal("show");
  }
  
  binding<T>(data: T){
    this.bindingService.setData<T>(data);
  }

}
