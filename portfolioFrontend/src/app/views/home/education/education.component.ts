import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { EduBindingService } from 'src/app/services/binding-services/edu-binding.service';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent<T> implements OnInit {

  public waiting: string = "  This_may_take_some_time<<<<<Thanks for waiting>>>>>This_may_take_some_time  ";

  public eduList: Array<Education>=[];
  public eduListShown: Array<Education>=[];

  private endPoint: string= "education/list";

  public loaded: boolean= false;

  public editMode: boolean= false;

  constructor(
    private dataService: DataService<T>,
    private modeBindingService: ModeBindingService<boolean>,
    private eduListBindingService: EduListBindingService<Array<Education>>,
    private eduBindingService: EduBindingService<Education>
    ) {
      this.modeBindingService.dataEmitter.subscribe((data: boolean) =>{
        this.editMode= data;
      })
      
    }

  ngOnInit(): void {
    this.onWaiting();
    this.dataService.getAll<any>(this.endPoint).subscribe(response => {
      if(response){
        this.eduList= Object.values(response);
        if(Array.isArray(this.eduList)){
          this.eduList.sort((a: Education, b: Education): number => a.eduIndex - b.eduIndex);
          this.eduListShown= this.eduList.filter((elem: Education) => elem.eduShow==true) || [];
        }
        this.loaded= true;
      }else{
        console.log("Education Component says: ", response);
      }
      })

      this.eduListBindingService.dataEmitter.subscribe((data: Array<Education>) =>{
        this.eduList= data;
        if(Array.isArray(this.eduList)){
          this.eduList.sort((a: Education, b: Education): number => a.eduIndex - b.eduIndex);
          this.eduListShown= this.eduList.filter((elem: Education) => elem.eduShow==true) || [];
        }
      })
      
  }

  onWaiting(){
    if(!this.loaded){
      let ini=0;
      setInterval(() => {
          if(this.waiting.length>18){
            this.waiting= this.waiting.substring(ini, this.waiting.length-1);
          }
          }, 3000);
          ini++;
        }
    return
  }

  openEditOne(i: number){
    this.eduBinding<Education>(this.eduListShown[i]);
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
    this.eduListBinding<Array<Education>>(this.eduList);
    $("#editEduSet").modal("show");
  }
  
  eduBinding<T>(data: T){
    this.eduBindingService.setData<T>(data);
  }

  eduListBinding<T>(data: T){
    this.eduListBindingService.setData<T>(data);
  }

}
