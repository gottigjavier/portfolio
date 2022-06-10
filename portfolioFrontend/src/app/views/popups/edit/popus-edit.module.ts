import { NgModule } from '@angular/core';
import { DataService } from 'src/app/services/data-services/data.service';
import { PopusEditComponent } from './popus-edit.component';
import { AboutEditModule } from './about-edit/about-edit/about-edit.module';
import { CommonModule } from '@angular/common';
import { EducationEditModule } from './education-edit/education-edit/education-edit.module';
import { ExperienceEditModule } from './experience-edit/experience-edit/experience-edit.module';
import { ProjectsEditModule } from './projects-edit/projects-edit/projects-edit.module';
import { SkillsEditModule } from './skills-edit/skills-edit/skills-edit.module';
import { SpokenLanguagesEditModule } from './spoken-languages-edit/spoken-languages-edit/spoken-languages-edit.module';
import { TechnologiesEditModule } from './technologies-edit/technologies-edit/technologies-edit.module';
import { UserEditModule } from './user-edit/user-edit/user-edit.module';
import { TechSetEditModule } from './tech-set-edit/tech-set-edit.module';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { TechDeleteModule } from '../delete/tech-delete/tech-delete.module';



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
    TechSetEditModule,
    UserEditModule,
    TechDeleteModule
  ],
  exports: [
    PopusEditComponent
  ],
  providers: [
    DataService,
    PopupBindingService
  ]
})
export class PopusEditModule { }
