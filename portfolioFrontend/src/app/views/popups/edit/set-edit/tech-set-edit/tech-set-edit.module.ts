import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechSetEditComponent } from './tech-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TechSetEditComponent
  ]
})
export class TechSetEditModule { }
