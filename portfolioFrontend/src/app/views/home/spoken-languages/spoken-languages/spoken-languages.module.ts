import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpokenLanguagesComponent } from './spoken-languages.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    SpokenLanguagesComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    SpokenLanguagesComponent
  ]
})
export class SpokenLanguagesModule { }
