import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesEditComponent } from './technologies-edit.component';

describe('TechnologiesEditComponent', () => {
  let component: TechnologiesEditComponent;
  let fixture: ComponentFixture<TechnologiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologiesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
