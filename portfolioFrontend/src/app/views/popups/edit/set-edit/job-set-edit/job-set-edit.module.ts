import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSetEditComponent } from './job-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    JobSetEditComponent
  ]
})
export class JobSetEditModule { }
