import { TestBed } from '@angular/core/testing';

import { CarLookupServiceService } from './car-lookup-service.service';

describe('CarLookupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarLookupServiceService = TestBed.get(CarLookupServiceService);
    expect(service).toBeTruthy();
  });
});
