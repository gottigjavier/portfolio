import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduSetEditComponent } from './edu-set-edit.component';

describe('EduSetEditComponent', () => {
  let component: EduSetEditComponent;
  let fixture: ComponentFixture<EduSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EduSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
