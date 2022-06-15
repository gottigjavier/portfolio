import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSetEditComponent } from './about-set-edit.component';

describe('AboutSetEditComponent', () => {
  let component: AboutSetEditComponent;
  let fixture: ComponentFixture<AboutSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
