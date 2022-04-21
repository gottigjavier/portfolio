import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonguesComponent } from './tongues.component';

describe('TonguesComponent', () => {
  let component: TonguesComponent;
  let fixture: ComponentFixture<TonguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TonguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TonguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
