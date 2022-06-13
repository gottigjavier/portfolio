import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEditComponent } from './one-edit.component';

describe('OneEditComponent', () => {
  let component: OneEditComponent;
  let fixture: ComponentFixture<OneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
