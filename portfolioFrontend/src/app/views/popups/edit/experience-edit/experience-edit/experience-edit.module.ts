import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceEditComponent } from './experience-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExperienceEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ExperienceEditComponent
  ]
})
export class ExperienceEditModule { }
