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

  loginForm = this.fb.group({
    userMail: [null,
      [
        Validators.required,
        Validators.email
      ]
    ],
    userPassword: [null,
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });


  constructor(
    private fb: FormBuilder,
    private routes:Router,
    private service: LoginService<T>) {
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
  onSubmit(): void {
    this.service.getUser<User>().subscribe(usr =>{
      //this.user = usr[0];
      //this.user.userMail = await user[0].userMail;
      //this.user.useruserPassword = await user[0].useruserPassword;
      console.log("Usr  -> ", usr);
      //console.log("this.user  ->> ", this.user);
    });
    // ojo estoy usando == en vez de ===
/*     if (this.loginForm.value.email == this.user.userMail && this.loginForm.value.userPassword == this.user.userPassword){
      this.routes.navigate(['/']);
      this.loginForm.reset();
    }else {
      alert('Email or Password don\'t match those of a user registered');
      console.log("Form mail", this.loginForm.value.email);
      console.log("Db mail", this.user.userMail);
      console.log("Form Pass", this.loginForm.value.userPassword);
      console.log("Db pass", this.user.userPassword);
      //this.routes.navigate(['/login']); // para qué navegar hacia donde ya estoy
    };  */
  }

  onClose(): void {
    this.loginForm.reset();
    this.routes.navigate(['/']);
  }
}
