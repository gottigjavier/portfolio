import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillSetEditComponent } from './skill-set-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillSetEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SkillSetEditComponent
  ]
})
export class SkillSetEditModule { }
