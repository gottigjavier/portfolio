import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologiesComponent } from './technologies.component';



@NgModule({
  declarations: [
    TechnologiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TechnologiesComponent
  ]
})
export class TechnologiesModule { }
