import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpokenLanguagesComponent } from './spoken-languages.component';

describe('SpokenLanguagesComponent', () => {
  let component: SpokenLanguagesComponent;
  let fixture: ComponentFixture<SpokenLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpokenLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpokenLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
