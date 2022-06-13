import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetEditComponent } from './set-edit.component';
import { TechSetEditModule } from './tech-set-edit/tech-set-edit.module';
import { ProjSetEditModule } from './proj-set-edit/proj-set-edit.module';



@NgModule({
  declarations: [
    SetEditComponent
  ],
  imports: [
    CommonModule,
    TechSetEditModule,
    ProjSetEditModule
  ],
  exports: [
    SetEditComponent
  ]
})
export class SetEditModule { }
