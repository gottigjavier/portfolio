import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangDeleteComponent } from './lang-delete.component';

describe('LangDeleteComponent', () => {
  let component: LangDeleteComponent;
  let fixture: ComponentFixture<LangDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
