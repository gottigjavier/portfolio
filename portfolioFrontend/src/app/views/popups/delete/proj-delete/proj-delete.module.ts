import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjDeleteComponent } from './proj-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjDeleteComponent
  ]
})
export class ProjDeleteModule { }
