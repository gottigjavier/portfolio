import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDeleteComponent } from './tech-delete.component';

describe('TechDeleteComponent', () => {
  let component: TechDeleteComponent;
  let fixture: ComponentFixture<TechDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
