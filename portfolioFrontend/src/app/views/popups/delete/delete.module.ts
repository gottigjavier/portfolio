import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete.component';
import { TechDeleteModule } from './tech-delete/tech-delete.module';
import { ProjDeleteModule } from './proj-delete/proj-delete.module';
import { LangDeleteComponent } from './lang-delete/lang-delete.component';
import { AboutDeleteModule } from './about-delete/about-delete.module';
import { EducationDeleteModule } from './education-delete/education-delete.module';
import { ExperienceDeleteModule } from './experience-delete/experience-delete.module';
import { LangDeleteModule } from './lang-delete/lang-delete.module';
import { SkillDeleteModule } from './skill-delete/skill-delete.module';



@NgModule({
  declarations: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    AboutDeleteModule,
    EducationDeleteModule,
    ExperienceDeleteModule,
    LangDeleteModule,
    SkillDeleteModule,
    TechDeleteModule,
    ProjDeleteModule
  ],
  exports: [
    DeleteComponent
  ]
})
export class DeleteModule { }
