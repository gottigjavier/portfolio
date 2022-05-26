import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopusEditComponent } from './popus-edit.component';

describe('PopusEditComponent', () => {
  let component: PopusEditComponent;
  let fixture: ComponentFixture<PopusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
