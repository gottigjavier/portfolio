import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCreateModule } from './technology-create/tech-create.module';
import { DataService } from 'src/app/services/data-services/data.service';
import { CreateComponent } from './create.component';
import { ProjCreateModule } from './project-create/proj-create.module';
import { AboutCreateModule } from './about-create/about-create.module';
import { EduCreateModule } from './education-create/edu-create.module';
import { JobCreateModule } from './experience-create/job-create.module'
import { LangCreateModule } from './lang-create/lang-create.module';
import { SkillCreateModule } from './skill-create/skill-create.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    AboutCreateModule,
    EduCreateModule,
    JobCreateModule,
    TechCreateModule,
    LangCreateModule,
    SkillCreateModule,
    ProjCreateModule
  ],
  exports: [
    CreateComponent
  ],
  providers: [
    DataService
  ]
})
export class CreateModule { }
