import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopusEditModule } from './edit/popus-edit.module';
import { PopusCreateModule } from './create/popus-create.module';
import { PopusComponent } from './popus.component';



@NgModule({
  declarations: [
    PopusComponent
  ],
  imports: [
    CommonModule,
    PopusEditModule,
    PopusCreateModule
  ],
  exports: [
    PopusComponent
  ]
})
export class PopusModule { }
