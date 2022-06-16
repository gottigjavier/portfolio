import { TestBed } from '@angular/core/testing';

import { AboutListBindingService } from './about-list-binding.service';

describe('AboutListBindingService', () => {
  let service: AboutListBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutListBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
