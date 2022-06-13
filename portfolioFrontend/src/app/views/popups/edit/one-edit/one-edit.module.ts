import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneEditComponent } from './one-edit.component';
import { UserEditModule } from './user-edit/user-edit/user-edit.module';
import { TechnologyEditModule } from './technology-edit/technology-edit/technology-edit.module';
import { SpokenLangEditModule } from './spoken-lang-edit/spoken-lang-edit/spoken-lang-edit.module';
import { SkillEditModule } from './skill-edit/skill-edit/skill-edit.module';
import { ProjectEditModule } from './project-edit/project-edit/project-edit.module';
import { ExperienceEditModule } from './experience-edit/experience-edit/experience-edit.module';
import { EducationEditModule } from './education-edit/education-edit/education-edit.module';
import { AboutEditModule } from './about-edit/about-edit/about-edit.module';



@NgModule({
  declarations: [
    OneEditComponent
  ],
  imports: [
    CommonModule,
    AboutEditModule,
    EducationEditModule,
    ExperienceEditModule,
    ProjectEditModule,
    SkillEditModule,
    SpokenLangEditModule,
    TechnologyEditModule,
    UserEditModule
  ],
  exports: [
    OneEditComponent
  ]
})
export class OneEditModule { }
