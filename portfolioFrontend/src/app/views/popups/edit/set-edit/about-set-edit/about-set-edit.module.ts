import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSetEditComponent } from './about-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AboutSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AboutSetEditComponent
  ]
})
export class AboutSetEditModule { }
