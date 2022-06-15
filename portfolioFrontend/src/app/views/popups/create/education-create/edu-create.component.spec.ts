import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduCreateComponent } from './edu-create.component';

describe('EduCreateComponent', () => {
  let component: EduCreateComponent;
  let fixture: ComponentFixture<EduCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EduCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
