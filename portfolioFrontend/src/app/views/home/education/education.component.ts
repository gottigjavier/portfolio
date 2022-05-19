import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent<T> implements OnInit {

  public eduList: Array<Education>=[];
  private endPoint: string= "education/list";

  constructor(private dataService: DataService<T>) { }

  ngOnInit(): void {
    this.dataService.getAll<Array<Education>>(this.endPoint).subscribe(response => {
    console.log("education -> ", response);
    this.eduList = response;
    })
  }

}
