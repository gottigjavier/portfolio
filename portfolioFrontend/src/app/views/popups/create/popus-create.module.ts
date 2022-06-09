import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologiesCreateModule } from './technologies-create/technologies-create.module';
import { PopusCreateComponent } from './popus-create.component';
import { DataService } from 'src/app/services/data-services/data.service';



@NgModule({
  declarations: [
    PopusCreateComponent
  ],
  imports: [
    CommonModule,
    TechnologiesCreateModule
  ],
  exports: [
    PopusCreateComponent
  ],
  providers: [
    DataService
  ]
})
export class PopusCreateModule { }
