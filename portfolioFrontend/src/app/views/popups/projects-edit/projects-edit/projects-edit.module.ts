import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsEditComponent } from './projects-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ProjectsEditComponent
  ]
})
export class ProjectsEditModule { }
