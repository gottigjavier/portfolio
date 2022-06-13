import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjSetEditComponent } from './proj-set-edit.component';

describe('ProjSetEditComponent', () => {
  let component: ProjSetEditComponent;
  let fixture: ComponentFixture<ProjSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
