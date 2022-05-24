import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationEditComponent } from './education-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EducationEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EducationEditComponent
  ]
})
export class EducationEditModule { }
