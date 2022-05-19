import { Component, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/models/job-experience.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent<T> implements OnInit {

  public jobList: Array<JobExperience>=[];

  private endPoint: string= "job-experience/list";

  constructor(private dataService: DataService<T>) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<JobExperience>>(this.endPoint).subscribe(response => {
      console.log("Job Experience -> ", response);
      this.jobList = response;
      })
  }

}
