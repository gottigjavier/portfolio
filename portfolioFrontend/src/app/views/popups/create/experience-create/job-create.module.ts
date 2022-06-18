import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCreateComponent } from './job-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    JobCreateComponent
  ]
})
export class JobCreateModule { }
