import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCreateComponent } from './skill-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SkillCreateComponent
  ]
})
export class SkillCreateModule { }
