import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologiesEditComponent } from './technologies-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechnologiesEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TechnologiesEditComponent
  ]
})
export class TechnologiesEditModule { }
