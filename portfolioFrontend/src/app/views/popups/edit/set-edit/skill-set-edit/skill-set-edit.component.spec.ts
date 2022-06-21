import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSetEditComponent } from './skill-set-edit.component';

describe('SkillSetEditComponent', () => {
  let component: SkillSetEditComponent;
  let fixture: ComponentFixture<SkillSetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
