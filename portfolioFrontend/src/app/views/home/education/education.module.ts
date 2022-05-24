import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EducationComponent
  ]
})
export class EducationModule { }
