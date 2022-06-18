import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { EduListBindingService } from 'src/app/services/binding-services/edu-list-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-education-delete',
  templateUrl: './education-delete.component.html',
  styleUrls: ['./education-delete.component.css']
})
export class EducationDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "education/delete";

  public deleteForm: FormGroup;

  public eduList: Array<Education>=[];
  private eduToDelete: Education;
  
  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    //private popupBindingService: PopupBindingService<T>,
    private eduListBindingService: EduListBindingService<T>
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
      console.log("aduc delete eduList ", this.eduList);
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
  }

  delSubmit(){
    this.eduList.forEach(elem => {
        if(elem.educationId == this.deleteForm.value.eduId){
          this.eduToDelete=elem;
          return
        }
      })
        if(this.eduToDelete.educationId<0){
          window.alert("Id mismatch");
        }else{
          this.dataService.delete(`${this.deleteEndPoint}/${this.eduToDelete.educationId}`).subscribe(resp =>{
            if(resp.statusCode == "OK"){
              let list: Array<Education>= Object.values(resp.body);
              this.eduList= list;
              this.eduListBinding<Array<Education>>(this.eduList);
            }else{
              window.alert(`Error: ${resp.statusCode}`);
            }
          })
          this.closePopup();
        }
  }
  

  closePopup(){
    this.eduList.length=0;
    this.deleteForm.reset();
    $("#deleteEdu").modal("hide");
  }

  eduListBinding<T>(data: T) {
    this.eduListBindingService.setData<T>(data);
  }


}
