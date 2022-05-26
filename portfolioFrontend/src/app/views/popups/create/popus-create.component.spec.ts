import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopusCreateComponent } from './popus-create.component';

describe('PopusCreateComponent', () => {
  let component: PopusCreateComponent;
  let fixture: ComponentFixture<PopusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopusCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
