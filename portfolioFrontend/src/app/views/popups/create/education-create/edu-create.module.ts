import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EduCreateComponent } from './edu-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EduCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EduCreateModule { }
