import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GoogleMapsService } from './google-maps.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from 'src/app/models/coordinates';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

describe('GoogleMapsService', () => {
  let googleMapsService:GoogleMapsService;
  let httpMock:HttpTestingController;
  beforeEach(() =>{ 
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoogleMapsService]
    });
    httpMock = TestBed.get(HttpTestingController);
    googleMapsService = TestBed.get(GoogleMapsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create", () => {
    expect(googleMapsService).toBeTruthy();
  })

  it('should call the next function for the googleMapsInputVisibilityEvent property', () => {
    let visibilitySpy = spyOn(googleMapsService.googleMapsInputVisibilityEvent, 'next');
    const expectedVisibility = true;
    googleMapsService.setInputVisibility(expectedVisibility);
    expect(visibilitySpy).toHaveBeenCalledWith(expectedVisibility);
  });

  it('should return googleMapsInputVisibility value if getInputVisibility called', () => {
    expect(googleMapsService.getInputVisibility()).toMatch(/true|false/);
  });

  it('should call the googleMapsMarkerListEvent next function after calling setCoordinatesList', () => {
    const markerList:Coordinates[] = [
      {lat: 100, lng: 100},
      {lat: 200, lng: 200},
      {lat: 300, lng: 300},
    ];
    
    let mapsMarkerSpy = spyOn(googleMapsService.googleMapsMarkerListEvent, 'next');
    googleMapsService.setCoordinatesList(markerList);
    expect(mapsMarkerSpy).toHaveBeenCalledWith(markerList);
  });
  
  it('should get googleMapsMarkerList if getCoordinatesList is called', () => {
    const markerList:Coordinates[] = [
      {lat: 100, lng: 100},
      {lat: 200, lng: 200},
      {lat: 300, lng: 300},
    ];

    googleMapsService.setCoordinatesList(markerList);
    expect(googleMapsService.getCoordinatesList()).toEqual(markerList);
  });

  it('should make an http post request to get Driver Recommendations when getDriverRecommendations is called', fakeAsync(() => {
    const numberOfDrivers = 5;
    const rider = new User();

    const mockUsers:User[] = [
      new User(),
      new User(),
      new User()
    ];

    mockUsers.forEach((user, index) =>{
      user.userId = index;
    });

    rider.userId = 1;
  
    googleMapsService.getDriverRecommendations(numberOfDrivers, rider).subscribe( user => {
      expect(user).toEqual(mockUsers);
    });
    
    let request = httpMock.expectOne(environment.recommendationUri + numberOfDrivers);
    expect(request.request.method).toBe("POST");
    request.flush(mockUsers);
  }));
});
