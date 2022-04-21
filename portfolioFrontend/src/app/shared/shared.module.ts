import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    FooterModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HeaderModule,
    FooterModule,
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
