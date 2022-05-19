import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ExperienceComponent
  ]
})
export class ExperienceModule { }
