import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserListBindingService<T> {
    data: any;

    @Output()
    dataEmitter = new EventEmitter<T>();

    setData<T>(newData: T) {
        this.data = newData;
        this.updatesData(this.data);
    }

    // Emitimos los cambio de this.data
    updatesData(data: T) {
        this.dataEmitter.emit(data);
    }

    constructor() { }
}