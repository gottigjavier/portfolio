import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpokenLanguagesEditComponent } from './spoken-languages-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SpokenLanguagesEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SpokenLanguagesEditComponent
  ]
})
export class SpokenLanguagesEditModule { }
