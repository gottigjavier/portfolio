import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjDeleteComponent } from './proj-delete.component';

describe('ProjDeleteComponent', () => {
  let component: ProjDeleteComponent;
  let fixture: ComponentFixture<ProjDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
