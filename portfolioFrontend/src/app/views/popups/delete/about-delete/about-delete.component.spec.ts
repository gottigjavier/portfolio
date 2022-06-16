import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDeleteComponent } from './about-delete.component';

describe('AboutDeleteComponent', () => {
  let component: AboutDeleteComponent;
  let fixture: ComponentFixture<AboutDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
