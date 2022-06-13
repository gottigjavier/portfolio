import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyEditComponent } from './technology-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TechnologyEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TechnologyEditComponent
  ]
})
export class TechnologyEditModule { }
