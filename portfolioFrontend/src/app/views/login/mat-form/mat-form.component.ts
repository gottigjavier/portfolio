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
        usermail : "",
        userpassword : ""
      }
    }

    // ver el tema observer async porque la primera vez la validacion da false
  onSubmit(): void {
    this.service.getUser().subscribe(async user =>{
      this.user = await user[0];
      //this.user.mail = user[0].usermail;
      //this.user.password = user[0].userpassword;
      console.log(this.user);
    });
    // ojo estoy usando == en vez de ===
    if (this.loginForm.value.email == this.user.usermail && this.loginForm.value.password == this.user.userpassword){
      this.routes.navigate(['/']);
      this.loginForm.reset();
    }else {
      alert('Email or Password don\'t match those of a user registered');
      console.log(this.loginForm.value.email);
      console.log(this.user);
      //this.routes.navigate(['/login']); // para qué navegar hacia donde ya estoy
    }; 
  }

  onClose(): void {
    this.loginForm.reset();
    this.routes.navigate(['/']);
  }
}
