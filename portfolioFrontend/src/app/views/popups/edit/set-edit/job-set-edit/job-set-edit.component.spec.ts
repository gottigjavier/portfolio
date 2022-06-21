import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSetEditComponent } from './job-set-edit.component';

describe('JobSetEditComponent', () => {
  let component: JobSetEditComponent;
  let fixture: ComponentFixture<JobSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
