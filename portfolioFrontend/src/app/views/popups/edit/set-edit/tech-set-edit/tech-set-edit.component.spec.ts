import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSetEditComponent } from './tech-set-edit.component';

describe('TechSetEditComponent', () => {
  let component: TechSetEditComponent;
  let fixture: ComponentFixture<TechSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
