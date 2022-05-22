import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutEditComponent } from './about-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AboutEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AboutEditComponent
  ]
})
export class AboutEditModule { }
