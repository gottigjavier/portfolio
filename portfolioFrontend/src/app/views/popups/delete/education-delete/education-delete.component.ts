import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-education-delete',
  templateUrl: './education-delete.component.html',
  styleUrls: ['./education-delete.component.css']
})
export class EducationDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "education";

  public deleteForm: FormGroup;

  public eduList: Array<Education>=[];
  private eduToDelete: Education;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private eduListBindingService: EduListBindingService<Array<Education>>
  ) {
    this.deleteForm = this.formBilder.group({
      eduId: ""
    });

    this.eduToDelete={
      educationId: -1,
      educationCareer: "",
      educationType: "",
      educationStart: "",
      educationEnd: "",
      approvedLevel: 30,
      institutionName: "",
      institutionLink: "",
      institutionLogo: "",
      eduShow: true,
      eduIndex: 0
    }

    this.eduListBindingService.dataEmitter.subscribe((data: Array<Education>)=>{
      this.eduList= Object.values(data);
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
  }

  delSubmit(){
    this.eduList.forEach(elem => {
        if(elem.educationId == this.deleteForm.value.eduId){
          this.eduToDelete=elem;
          this.eduList = this.eduList.filter(elem => elem.educationId != this.eduToDelete.educationId);
          return
        }
      })
        if(this.eduToDelete.educationId<0){
          window.alert("Id mismatch");
        }else{
          this.eduListBinding<Array<Education>>(this.eduList);
          this.closePopup();
          this.dataService.delete(`${this.deleteEndPoint}/${this.eduToDelete.educationId}`).subscribe(resp =>{
            if(resp){
              this.eduList.length=0;
              this.eduList= Object.values(resp);
              this.eduListBinding<Array<Education>>(this.eduList);
              this.deleteForm.reset();
            }else{
              window.alert(`Delete Education says: ${resp}`);
            }
          })
        }
  }
  

  closePopup(){
    $("#deleteEdu").modal("hide");
  }

  eduListBinding<T>(data: T) {
    this.eduListBindingService.setData<T>(data);
  }


}
