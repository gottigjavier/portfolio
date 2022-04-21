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

export class MatFormComponent {

  private user: User;

  loginForm = this.fb.group({
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
    ]
  });


  constructor(
    private fb: FormBuilder,
    private routes:Router,
    private service: LoginService) {
      this.user = {
        username : "",
        mail : "",
        password : ""
      }
    }

  onSubmit(): void {
    this.service.getUser().subscribe(user =>{
      this.user = user[0];
    });
    if (this.loginForm.value.email === this.user.mail && this.loginForm.value.password === this.user.password){
      this.loginForm.reset();
      this.routes.navigate(['/']);
    }else {
      alert('Email or Password don\'t match those of a user registered');
      //this.routes.navigate(['/login']); // para qué navegar hacia donde ya estoy
    }; 
  }

  onClose(): void {
    this.loginForm.reset();
    this.routes.navigate(['/']);
  }
}
