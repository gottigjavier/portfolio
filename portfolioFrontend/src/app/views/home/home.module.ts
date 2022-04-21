import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataService } from 'src/app/services/data.service';
import { AboutModule } from './about/about.module';
import { BannerModule } from './banner/banner.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    AboutModule,
    SharedModule
  ],
  exports: [
    AboutModule
  ]
})
export class HomeModule { }
