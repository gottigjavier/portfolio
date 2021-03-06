import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about-delete',
  templateUrl: './about-delete.component.html',
  styleUrls: ['./about-delete.component.css']
})
export class AboutDeleteComponent<T> implements OnInit {

  private deleteEndPoint: string = "about";

  public deleteForm: FormGroup;

  public aboutList: Array<About>=[];
  public aboutListFalse: Array<About>=[];
  private aboutToDelete: About;
  private aboutReset: About;
  public list: Array<About>=[];

  constructor(
    private formBilder: FormBuilder,
    private dataService: DataService<T>,
    private aboutListBindingService: AboutListBindingService<Array<About>>
  ) {
    this.deleteForm = this.formBilder.group({
      aboutId: ""
    });

    this.aboutReset={
      aboutId: -1,
      firstName:"",
      lastName:"",
      photoUrl:"",
      shortExplanation:"",
      aboutShown: false,
    }

    this.aboutToDelete= this.aboutReset;
  }

  ngOnInit(): void {
    this.aboutListBindingService.dataEmitter.subscribe((data: Array<About>)=>{
      let list= Object.values(data);
      this.aboutList= list;
      this.aboutListFalse= this.aboutList.filter((elem: About)=> elem.aboutShown==false) || [];
    })
  }

  delSubmit(){
    this.aboutListFalse.forEach(elem => {
        if(elem.aboutId == this.deleteForm.value.aboutId){
          this.aboutToDelete=elem;
          return
        }
      })
        if(this.aboutToDelete.aboutId<0){
          window.alert("Id mismatch");
        }else{
          this.aboutList.filter(elem => elem.aboutId != this.aboutToDelete.aboutId);
          this.aboutListBinding<Array<About>>(this.aboutList);
          this.closePopup();
          this.dataService.delete(`${this.deleteEndPoint}/${this.aboutToDelete.aboutId}`).subscribe(resp =>{
            if(resp){
              this.aboutToDelete= this.aboutReset;
              this.aboutList= Object.values(resp);
              this.aboutListBinding<Array<About>>(this.aboutList);
              this.deleteForm.reset();
            }else{
              window.alert(`Delete About says: ${resp}`);
            }
          })
        }
  }
  

  closePopup(){
    $("#deleteAbout").modal("hide");
  }

  aboutListBinding<T>(data: T) {
    this.aboutListBindingService.setData<T>(data);
  }


}
