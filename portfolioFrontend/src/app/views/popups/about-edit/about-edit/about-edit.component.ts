import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $ : any;

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent implements OnInit {

  constructor(
    //public formdata: FormGroup
  ) { }

  
  title: string = 'angularpopupform';
  
  closePopup(){
    $("#myModal").modal("hide");
  }
  ngOnInit()
  {
    /* this.formdata = new FormGroup({
      Fname : new FormControl("", [Validators.required])
    }); */
  }
  on_submit(fordata: any){
       // if (this.formdata.invalid) {
          /* Object.keys(this.formdata.controls).forEach(key => {
            this.formdata.get(key).markAsTouched();
         // }); */
      //}
      }

}
