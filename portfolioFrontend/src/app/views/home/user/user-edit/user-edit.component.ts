import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/auth-sevices/login.service';
import { UserBindingService } from 'src/app/services/binding-services/user-binging.service';

declare var $ : any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent<T> implements OnInit {

  private user: User;

  private endPoint: string= "changepass";

  public loginUser={
    "userName": "",
    "password": ""
  }

  loginForm = this.fb.group({
    password: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    rePassword: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  },{validator: this.checkIfMatchingPasswords('password', 'rePassword')}
  );

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private userBindingService: UserBindingService<User>
    ) {
      this.user = {
        userId: 0,
        userName : '',
        email : '',
        password : '',
        authorities:[]
      }
    }

    ngOnInit(): void {
      this.userBindingService.dataEmitter.subscribe((data: User)=>{
        this.user= data;
      })
    }

    onSubmit(event: Event): void {
    event.preventDefault;
      this.loginUser.userName= this.user.userName;
      this.loginUser.password= this.loginForm.value.password;
      this.loginService.changePass(this.loginUser, this.endPoint).subscribe(resp =>{
        if(resp){
          window.alert(resp.password); //Viene el token con un 200, o un 401
          this.onClose();
          this.loginService.logout();
        }else{
          console.log("Something went wrong ", resp);
        }
      });
  }

  onClose(): void {
    this.loginForm.reset();
    $("#changePass").modal("hide");
  }

}
