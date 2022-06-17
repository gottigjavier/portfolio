import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
