import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutModule } from './about/about.module';
import { BannerModule } from './banner/banner.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { DataService } from 'src/app/services/data-services/data.service';
import { EducationModule } from './education/education.module';
import { SkillsModule } from './skills/skills.module';
import { SpokenLanguagesModule } from './spoken-languages/spoken-languages/spoken-languages.module';
import { PopusModule } from '../popups/popus.module';
import { ModeBindingService } from 'src/app/services/binding-services/mode-binding.service';
import { TechBindingService } from 'src/app/services/binding-services/tech-binding.service';
import { ProjBindingService } from 'src/app/services/binding-services/proj-binding.service';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { TechListBindingService } from 'src/app/services/binding-services/tech-list-binding.service';


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
    SharedModule,
    PopusModule
  ],
  exports: [
    AboutModule,
    ExperienceModule,
    EducationModule,
    SkillsModule,
    SpokenLanguagesModule,
    ProjectsModule,
    TechnologiesModule,
    PopusModule
  ],
  providers: [
    DataService,
    ModeBindingService,
    TechBindingService,
    ProjBindingService,
    PopupBindingService,
    TechListBindingService
  ]
})
export class HomeModule { }
