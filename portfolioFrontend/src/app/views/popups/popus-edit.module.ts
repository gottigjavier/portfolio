import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutEditModule } from './about-edit/about-edit/about-edit.module';
import { EducationEditModule } from './education-edit/education-edit/education-edit.module';
import { ExperienceEditModule } from './experience-edit/experience-edit/experience-edit.module';
import { ProjectsEditModule } from './projects-edit/projects-edit/projects-edit.module';
import { SkillsEditModule } from './skills-edit/skills-edit/skills-edit.module';
import { SpokenLanguagesEditModule } from './spoken-languages-edit/spoken-languages-edit/spoken-languages-edit.module';
import { TechnologiesEditModule } from './technologies-edit/technologies-edit/technologies-edit.module';
import { UserEditModule } from './user-edit/user-edit/user-edit.module';
import { DataService } from 'src/app/services/data.service';
import { BindingService } from 'src/app/services/binding.service';
import { PopusEditComponent } from './popus-edit.component';



@NgModule({
  declarations: [
    PopusEditComponent
  ],
  imports: [
    CommonModule,
    AboutEditModule,
    EducationEditModule,
    ExperienceEditModule,
    ProjectsEditModule,
    SkillsEditModule,
    SpokenLanguagesEditModule,
    TechnologiesEditModule,
    UserEditModule
  ],
  exports: [
    PopusEditComponent
  ],
  providers: [
    DataService,
    BindingService
  ]
})
export class PopusEditModule { }
