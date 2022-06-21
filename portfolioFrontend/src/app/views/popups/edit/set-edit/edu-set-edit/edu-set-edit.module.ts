import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EduSetEditComponent } from './edu-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EduSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EduSetEditComponent
  ]
})
export class EduSetEditModule { }
