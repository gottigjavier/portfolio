import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { DataService } from 'src/app/services/data.service';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[
    AboutComponent
  ],
  providers: [
    DataService
  ]
})
export class AboutModule { }
