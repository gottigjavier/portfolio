import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjCreateComponent } from './proj-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjCreateComponent
  ]
})
export class ProjCreateModule { }
