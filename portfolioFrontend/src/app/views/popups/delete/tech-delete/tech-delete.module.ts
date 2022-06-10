import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechDeleteComponent } from './tech-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TechDeleteComponent
  ]
})
export class TechDeleteModule { }
