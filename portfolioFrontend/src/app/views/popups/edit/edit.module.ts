import { NgModule } from '@angular/core';
import { DataService } from 'src/app/services/data-services/data.service';
import { EditComponent } from './edit.component';
import { CommonModule } from '@angular/common';
import { PopupBindingService } from 'src/app/services/binding-services/popup-binding.service';
import { OneEditModule } from './one-edit/one-edit.module';
import { SetEditModule } from './set-edit/set-edit.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    OneEditModule,
    SetEditModule
  ],
  exports: [
    EditComponent
  ],
  providers: [
    DataService,
    PopupBindingService
  ]
})
export class EditModule { }
