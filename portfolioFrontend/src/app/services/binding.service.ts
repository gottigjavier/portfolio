import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BindingService<T> {

  data: any;

  @Output()
  dataEmitter = new EventEmitter<T>();

  setData(newData: T) {
    this.data = newData;
    this.updatesData();
  }

  // Emitimos los cambio de this.persona.
  updatesData() {
    this.dataEmitter.emit(this.data);
  }

  constructor() { }
}
