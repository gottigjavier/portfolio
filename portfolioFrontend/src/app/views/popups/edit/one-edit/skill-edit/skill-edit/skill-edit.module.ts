import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillEditComponent} from './skill-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SkillEditComponent
  ]
})
export class SkillEditModule { }
