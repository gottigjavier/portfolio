import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { About } from 'src/app/models/about.model';
import { AboutListBindingService } from 'src/app/services/binding-services/about-list-binding.service';
import { DataService } from 'src/app/services/data-services/data.service';

declare var $ : any;

@Component({
  selector: 'app-about-set-edit',
  templateUrl: './about-set-edit.component.html',
  styleUrls: ['./about-set-edit.component.css']
})
export class AboutSetEditComponent<T> implements OnInit {

  private aboutUpdateListEndPoint: string="about/list";

  public aboutList: Array<About>=[];

  setForm: FormGroup;
  setFormArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<T>,
    private aboutListBindingService: AboutListBindingService<Array<About>>
  ) {
    
    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;

    this.setForm= this.fb.group({
      setList: this.fb.array([])
    })

  } // End constructor
  
    ngOnInit(): void {
      this.aboutListBindingService.dataEmitter.subscribe((data: Array<About>)=>{
        this.aboutList= data || this.aboutList;
      })
    }

  onCheckboxChange(e:any){
    this.aboutList.forEach(elem=>{
      if(elem.aboutId == e.target.id){
        elem.aboutShown=true;
      }else{
        elem.aboutShown=false;
      }
    })
  }

  shownSubmit(){
    this.aboutListBinding<Array<About>>(this.aboutList);
    this.closePopup();
    this.dataService.update(this.aboutUpdateListEndPoint, this.aboutList).subscribe(resp=>{
      if(resp){
        this.aboutList=resp;
        this.aboutListBinding<Array<About>>(this.aboutList);
      }else{
        window.alert(`Edit About Set says: ${resp}`);
      }
    })
  }

  closePopup(){
    $("#shownAbout").modal("hide");
  }

  aboutListBinding<T>(data: T){
    this.aboutListBindingService.setData<T>(data);
  }


}
