import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutModule } from './about/about.module';
import { BannerModule } from './banner/banner.module';
import { TechnologiesModule } from './technologies/technologies.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    AboutModule,
    TechnologiesModule,
    SharedModule
  ],
  exports: [
    AboutModule,
    TechnologiesModule
  ]
})
export class HomeModule { }
