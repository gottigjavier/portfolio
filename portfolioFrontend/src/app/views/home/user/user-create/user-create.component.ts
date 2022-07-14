import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/auth-sevices/login.service';

declare var $ : any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent<T> implements OnInit {

  private user: User;

  private endPoint: string= "newuser";

  public loginUser={
    "userName": "",
    "email":"",
    "password": "",
    "roles": [""]
  }

  loginForm = this.fb.group({
    userName: [null,
      [
        Validators.required,
        Validators.minLength(6) //Para que acepte "admin". Aumentar en produccion
      ]
    ],
    email: [null, 
      [
        Validators.required, 
        Validators.email
      ]
    ],
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
    ],
    admin: [false]
  },{validator: this.checkIfMatchingPasswords('password', 'rePassword')});

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
    private loginService: LoginService) {
      this.user = {
        userId: 0,
        userName : '',
        email : '',
        password : '',
        authorities:[]
      }
    }

    ngOnInit(): void {
      
    }

    onSubmit(event: Event): void {
    event.preventDefault;
    this.loginUser.userName= this.loginForm.value.userName;
    this.loginUser.email= this.loginForm.value.email;
    this.loginUser.password= this.loginForm.value.password;
    if(this.loginForm.value.admin){
      this.loginUser.roles[0]= "admin";
    }
    console.log("loginUsr  -> ", this.loginUser);
    this.loginService.newUser(this.loginUser, this.endPoint).subscribe(resp =>{
      console.log("Usr created  -> ", resp); //Viene el token con un 200, o un 401
      this.onClose();
    });
  }

  onClose(): void {
    this.loginForm.reset();
    $("#newUser").modal("hide");
  }
}
