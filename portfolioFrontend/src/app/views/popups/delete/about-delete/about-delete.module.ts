import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDeleteComponent } from './about-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AboutDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AboutDeleteComponent
  ]
})
export class AboutDeleteModule { }
