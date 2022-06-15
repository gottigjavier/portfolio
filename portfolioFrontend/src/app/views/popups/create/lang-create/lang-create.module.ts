import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangCreateComponent } from './lang-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LangCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LangCreateModule { }
