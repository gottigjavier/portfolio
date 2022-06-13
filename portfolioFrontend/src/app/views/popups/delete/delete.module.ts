import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete.component';
import { TechDeleteModule } from './tech-delete/tech-delete.module';
import { ProjDeleteModule } from './proj-delete/proj-delete.module';



@NgModule({
  declarations: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    TechDeleteModule,
    ProjDeleteModule
  ],
  exports: [
    DeleteComponent
  ]
})
export class DeleteModule { }
