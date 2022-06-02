import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-mat-form',
  templateUrl: './mat-form.component.html',
  styleUrls: ['./mat-form.component.css']
})

export class MatFormComponent <T>{

  private user: User;

  private loginUser={
    "userName": "",
    "password": ""
  }

  loginForm = this.fb.group({
    userName: [null,
      [
        Validators.required,
        Validators.minLength(4) //Para que acepte "admin". Aumentar en produccion
      ]
    ],
    password: [null,
      [
        Validators.required,
        Validators.minLength(4)
      ]
    ]
  });


  constructor(
    private fb: FormBuilder,
    private routes:Router,
    private service: LoginService) {
      this.user = {
        userId: 0,
        userName : '',
        userMail : '',
        userPassword : ''
      }
    }
    // levantar servidor backend o mock-db
    // notar que pasa el parámetro User porque LoginService<T> es genérico
    // al igual que DataService
    // Por ahora para pruebas se usa el metodo getUser igual a getAll de DataService 
    // pero para LoginService habrá que construir métodos exclusivos de login
  onSubmit(event: Event): void {
    event.preventDefault;
    this.loginUser.userName= this.loginForm.value.userName;
    this.loginUser.password= this.loginForm.value.password;
    console.log("loginUsr  -> ", this.loginUser);
    this.service.login(this.loginForm.value).subscribe(resp =>{
      console.log("Usr  -> ", resp); //Viene el token con un 200, o un 401
      this.onClose();
    });
  }

  onClose(): void {
    this.loginForm.reset();
    this.routes.navigate(['/']);
  }
}
