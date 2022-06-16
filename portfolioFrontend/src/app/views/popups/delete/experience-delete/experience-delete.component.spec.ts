import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceDeleteComponent } from './experience-delete.component';

describe('ExperienceDeleteComponent', () => {
  let component: ExperienceDeleteComponent;
  let fixture: ComponentFixture<ExperienceDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
