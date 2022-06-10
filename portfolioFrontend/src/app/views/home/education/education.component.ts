import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

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
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<Education>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
    }

  ngOnInit(): void {
    this.dataService.getAll<Array<Education>>(this.endPoint).subscribe(response => {
    response.sort((a,b) => a.eduIndex - b.eduIndex);
    this.eduList = response;
    })
  }

  openEdit(i: number){
    this.popupBinding<Education>(this.eduList[i]);
    $("#editEdu").modal("show");
  }
  
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

}
