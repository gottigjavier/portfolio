import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutModule } from './about/about.module';
import { BannerModule } from './banner/banner.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { DataService } from 'src/app/services/data.service';
import { EducationModule } from './education/education.module';
import { SkillsModule } from './skills/skills.module';
import { SpokenLanguagesModule } from './spoken-languages/spoken-languages/spoken-languages.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    AboutModule,
    ExperienceModule,
    EducationModule,
    SkillsModule,
    SpokenLanguagesModule,
    ProjectsModule,
    TechnologiesModule,
    SharedModule
  ],
  exports: [
    AboutModule,
    ExperienceModule,
    EducationModule,
    SkillsModule,
    SpokenLanguagesModule,
    ProjectsModule,
    TechnologiesModule
  ],
  providers: [
    DataService
  ]
})
export class HomeModule { }
