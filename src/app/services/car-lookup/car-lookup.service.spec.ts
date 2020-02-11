import { TestBed } from '@angular/core/testing';

import { CarLookupService } from './car-lookup.service';

describe('CarLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarLookupService = TestBed.get(CarLookupService);
    expect(service).toBeTruthy();
  });
});
