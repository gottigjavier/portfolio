import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetEditComponent } from './set-edit.component';
import { TechSetEditModule } from './tech-set-edit/tech-set-edit.module';
import { ProjSetEditModule } from './proj-set-edit/proj-set-edit.module';
import { AboutSetEditModule } from './about-set-edit/about-set-edit.module';
import { EduSetEditModule } from './edu-set-edit/edu-set-edit.module';
import { JobSetEditModule } from './job-set-edit/job-set-edit.module';
import { LangSetEditModule } from './lang-set-edit/lang-set-edit.module';
import { SkillSetEditModule } from './skill-set-edit/skill-set-edit.module';



@NgModule({
  declarations: [
    SetEditComponent
  ],
  imports: [
    CommonModule,
    AboutSetEditModule,
    EduSetEditModule,
    JobSetEditModule,
    LangSetEditModule,
    TechSetEditModule,
    SkillSetEditModule,
    ProjSetEditModule
  ],
  exports: [
    SetEditComponent
  ]
})
export class SetEditModule { }
