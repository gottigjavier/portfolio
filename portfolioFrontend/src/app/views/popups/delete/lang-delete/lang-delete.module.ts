import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangDeleteComponent } from './lang-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LangDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    LangDeleteComponent
  ]

})
export class LangDeleteModule { }
