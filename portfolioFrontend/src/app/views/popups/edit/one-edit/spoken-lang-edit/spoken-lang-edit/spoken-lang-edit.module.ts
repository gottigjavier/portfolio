import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpokenLangEditComponent } from './spoken-lang-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SpokenLangEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SpokenLangEditComponent
  ]
})
export class SpokenLangEditModule { }
