import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCreateComponent } from './tech-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TechCreateComponent
  ]
})
export class TechCreateModule { }
