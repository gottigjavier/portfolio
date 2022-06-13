import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModule } from './edit/edit.module';
import { PopupsComponent } from './popups.component';
import { CreateModule } from './create/create.module';
import { DeleteModule } from './delete/delete.module';



@NgModule({
  declarations: [
    PopupsComponent
  ],
  imports: [
    CommonModule,
    EditModule,
    CreateModule,
    DeleteModule
  ],
  exports: [
    PopupsComponent
  ]
})
export class PopupsModule { }
