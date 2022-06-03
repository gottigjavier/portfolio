import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Technology } from 'src/app/models/technology.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-tech-set-edit',
  templateUrl: './tech-set-edit.component.html',
  styleUrls: ['./tech-set-edit.component.css']
})
export class TechSetEditComponent<T> implements OnInit {

  private techListEndPoint: string="technology/list";

  public techListAll: Array<Technology>=[];
  public techListTrue: Array<Technology>=[];
  public techListFalse: Array<Technology>=[];

  setForm: FormGroup;
  setFormArray: FormArray;

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.setFormArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.setFormArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.setFormArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<T>
  ) {
    this.service.getAll<Array<Technology>>(this.techListEndPoint).subscribe(response =>{
      this.techListAll=response;
      this.techListTrue= this.techListAll.filter(elm => elm.techShow);
      this.techListFalse= this.techListAll.filter(elm => !elm.techShow);
    })

    this.setForm= this.fb.group({
      techList: this.fb.array([])
    })

    this.setForm=this.fb.group({setFormArray: this.fb.array([])});
    this.setFormArray= this.setForm.get('setFormArray') as FormArray;
  }

  ngOnInit(): void {
  }

  setSubmit(){

  }

  closePopup(){
    $("#editTechSet").modal("hide");
  }

}
