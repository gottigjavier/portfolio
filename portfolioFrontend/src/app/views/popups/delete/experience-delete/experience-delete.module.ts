import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceDeleteComponent } from './experience-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExperienceDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ExperienceDeleteComponent
  ]
})
export class ExperienceDeleteModule { }
