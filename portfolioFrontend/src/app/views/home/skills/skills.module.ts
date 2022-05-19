import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    SkillsComponent
  ]
})
export class SkillsModule { }
