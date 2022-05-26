import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpokenLanguagesEditComponent } from './spoken-languages-edit.component';

describe('SpokenLanguagesEditComponent', () => {
  let component: SpokenLanguagesEditComponent;
  let fixture: ComponentFixture<SpokenLanguagesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpokenLanguagesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpokenLanguagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
