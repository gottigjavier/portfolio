import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjSetEditComponent } from './proj-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjSetEditComponent
  ]
})
export class ProjSetEditModule { }
