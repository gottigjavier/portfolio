import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {MatInputModule} from '@angular/material/input'; 
import { LoginComponent } from './login.component';
import { MatFormComponent } from './mat-form/mat-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginService } from 'src/app/services/auth-sevices/login.service';

@NgModule({
  declarations: [
    LoginComponent,
    MatFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
