import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserCreateModule } from './user-create/user-create.module';
import { UserEditModule } from './user-edit/user-edit.module';
import { UserDeleteModule } from './user-delete/user-delete.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    UserCreateModule,
    UserEditModule,
    UserDeleteModule,
    SharedModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
