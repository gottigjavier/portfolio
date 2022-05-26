import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { BindingService } from 'src/app/services/binding.service';
import { DataService } from 'src/app/services/data.service';

declare var $ : any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent<T> {

  public user: User;

  private endPoint: string="user/update";

  popupForm= this.fb.group({
    userName: "",
    userMail: "",
    userPassword: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    userNewPassword: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    userRepeatPassword: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  })


  constructor(
    private fb: FormBuilder,
    private service: DataService<T>,
    private binding: BindingService<User>
  ) {
    this.user={
      userId: 0,
      userName: "",
      userMail: "",
      userPassword: ""
    }

    this.binding.dataEmitter.subscribe((data: User) =>{
      this.user= data;
    })

  }

  // Verificación y autencticación por favor !!!

  onSubmit(){
    this.user.userName= this.popupForm.value.userName || this.user.userName;
    this.user.userMail= this.popupForm.value.userMail || this.user.userMail;
    // save repeat password or last password saved
    this.user.userPassword= this.popupForm.value.userRepeatPassword || this.user.userPassword;
    this.service.update(this.endPoint, this.user).subscribe(resp =>{
      if(!resp){
        alert("Error: Not saved")
      };
    })
    this.closePopup();
  }
  
      closePopup(){
    $("#editUser").modal("hide");
  }

}
