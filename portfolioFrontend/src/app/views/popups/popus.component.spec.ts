import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopusComponent } from './popus.component';

describe('PopusComponent', () => {
  let component: PopusComponent;
  let fixture: ComponentFixture<PopusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
