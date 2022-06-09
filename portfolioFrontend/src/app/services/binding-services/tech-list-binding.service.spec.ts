import { TestBed } from '@angular/core/testing';

import { TechListBindingService } from './tech-list-binding.service';

describe('TechListBindingService', () => {
  let service: TechListBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechListBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
