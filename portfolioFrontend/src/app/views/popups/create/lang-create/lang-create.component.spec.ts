import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangCreateComponent } from './lang-create.component';

describe('LangCreateComponent', () => {
  let component: LangCreateComponent;
  let fixture: ComponentFixture<LangCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
