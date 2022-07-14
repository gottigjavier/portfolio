import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDeleteComponent } from './user-delete.component';
import { LoginRoutingModule } from 'src/app/views/login/login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserDeleteComponent
  ]
})
export class UserDeleteModule { }
