import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSetEditComponent } from './lang-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LangSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LangSetEditComponent
  ]
})
export class LangSetEditModule { }
