import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsEditComponent } from './skills-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SkillsEditComponent
  ]
})
export class SkillsEditModule { }
