import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologiesCreateComponent } from './technologies-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechnologiesCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TechnologiesCreateComponent
  ]
})
export class TechnologiesCreateModule { }
