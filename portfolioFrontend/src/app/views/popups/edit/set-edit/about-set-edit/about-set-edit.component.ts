import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about-set-edit',
  templateUrl: './about-set-edit.component.html',
  styleUrls: ['./about-set-edit.component.css']
})
export class AboutSetEditComponent<T> implements OnInit {

  private aboutUpdateListEndPoint: string="about/update/list";

  public aboutList: Array<About>=[];

  setForm: FormGroup;
  setFormArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private popupBindingService: PopupBindingService<About>,
    private aboutListBindingService: AboutListBindingService<T>
  ) {
    this.popupBindingService.dataEmitter.subscribe((data: Array<About>)=>{
      this.aboutList= data || this.aboutList;
    })

    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  } // End constructor

  onCheckboxChange(e:any){
    this.aboutList.forEach(elem=>{
      if(elem.aboutId == e.target.id){
        elem.aboutShown=true;
      }else{
        elem.aboutShown=false;
      }
    })
    console.log("about change element:: ", this.aboutList);
  }

  shownSubmit(){
    this.dataService.update(this.aboutUpdateListEndPoint, this.aboutList).subscribe(resp=>{
      if(!resp){
        alert("Error: Not saved");
      }else{
        this.aboutList=resp.body;
        this.aboutListBinding<Array<About>>(this.aboutList);
      }
    })
    this.closePopup();
  }

  closePopup(){
    $("#shownAbout").modal("hide");
  }

  aboutListBinding<T>(data: T){
    this.aboutListBindingService.setData<T>(data);
  }



  ngOnInit(): void {
    this.aboutListBindingService.dataEmitter.subscribe((data: Array<About>)=>{
      this.aboutList= data || this.aboutList;
    })
  }

}
