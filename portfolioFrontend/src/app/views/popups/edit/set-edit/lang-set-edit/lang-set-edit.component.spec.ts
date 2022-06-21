import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSetEditComponent } from './lang-set-edit.component';

describe('LangSetEditComponent', () => {
  let component: LangSetEditComponent;
  let fixture: ComponentFixture<LangSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
