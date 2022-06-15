import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutCreateComponent } from './about-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AboutCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AboutCreateComponent
  ]
})
export class AboutCreateModule { }
