import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent<T> implements OnInit {

  public eduList: Array<Education>=[];
  private endPoint: string= "education/list";

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private bindingService: BindingService<Education>
    ) {
      this.bindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<Education>>(this.endPoint).subscribe(response => {
    console.log("education -> ", response);
    response.sort((a,b) => a.eduIndex - b.eduIndex);
    this.eduList = response;
    })
  }

  openEdit(i: number){
    this.binding<Education>(this.eduList[i]);
    $("#editEdu").modal("show");
  }
  
  binding<T>(data: T){
    this.bindingService.setData<T>(data);
  }

}
