import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologiesComponent } from './technologies.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    TechnologiesComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    TechnologiesComponent
  ]
})
export class TechnologiesModule { }
