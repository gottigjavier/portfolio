import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationDeleteComponent } from './education-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EducationDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    EducationDeleteComponent
  ]
})
export class EducationDeleteModule { }
