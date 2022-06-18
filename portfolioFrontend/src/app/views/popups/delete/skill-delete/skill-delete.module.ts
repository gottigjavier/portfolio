import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillDeleteComponent } from './skill-delete.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SkillDeleteComponent
  ]
})
export class SkillDeleteModule { }
