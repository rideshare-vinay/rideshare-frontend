import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';


import { CarLookupService } from './car-lookup.service';

describe('CarLookupService', () => {
  let httpMock:HttpTestingController;
  let carLookupService:CarLookupService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarLookupService]
    });
    carLookupService = TestBed.get(CarLookupService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach( () => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(carLookupService).toBeTruthy();
  });
});
