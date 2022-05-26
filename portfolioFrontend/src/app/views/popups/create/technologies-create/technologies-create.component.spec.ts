import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesCreateComponent } from './technologies-create.component';

describe('TechnologiesCreateComponent', () => {
  let component: TechnologiesCreateComponent;
  let fixture: ComponentFixture<TechnologiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologiesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
