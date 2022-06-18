import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
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
  public eduListShown: Array<Education>=[];

  private endPoint: string= "education/list";

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private popupBindingService: PopupBindingService<T>,
    private eduListBindingService: EduListBindingService<T>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })

      this.eduListBindingService.dataEmitter.subscribe((data: Array<Education>) =>{
        this.eduList= data;
        if(Array.isArray(this.eduList)){
          this.eduList.sort((a: Education, b: Education): number => a.eduIndex - b.eduIndex);
          this.eduListShown= this.eduList.filter((elem: Education) => elem.eduShow==true) || [];
          console.log("EduList despues borrar ", this.eduList);
        }
      })
      
    }

  ngOnInit(): void {
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response.statusCode == "OK"){
      let list: Array<Education>= Object.values(response.body);
        this.eduList = list;
        console.log("educ component eduList ", this.eduList);
        if(Array.isArray(this.eduList)){
          this.eduList.sort((a: Education, b: Education): number => a.eduIndex - b.eduIndex);
          this.eduListShown= this.eduList.filter((elem: Education) => elem.eduShow==true) || [];
        }
      }else{
        window.alert(`Error: ${response.statusCode}`);
      }
      })
      
  }

  openEditOne(i: number){
    this.popupBinding<Education>(this.eduList[i]);
    $("#editEdu").modal("show");
  }

  openNewEdu(){
    $("#newEdu").modal("show");
  }

  openDeleteEdu(){
    this.eduListBinding<Array<Education>>(this.eduList);
    $("#deleteEdu").modal("show");
  }

  openEditSetEdu(){
    
  }
  
  popupBinding<T>(data: T){
    this.popupBindingService.setData<T>(data);
  }

  eduListBinding<T>(data: T){
    this.eduListBindingService.setData<T>(data);
  }

}
