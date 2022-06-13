import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCreateModule } from './technology-create/tech-create.module';
import { DataService } from 'src/app/services/data-services/data.service';
import { CreateComponent } from './create.component';
import { ProjCreateModule } from './project-create/proj-create.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    TechCreateModule,
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
