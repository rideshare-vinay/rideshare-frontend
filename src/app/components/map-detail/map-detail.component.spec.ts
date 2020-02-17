import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MapDetailComponent } from './map-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from 'src/app/services/google-maps-service/google-maps.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('MapDetailComponent', () => {
  let component: MapDetailComponent;
  let fixture: ComponentFixture<MapDetailComponent>;
  let authService:AuthService;
  let userService:UserService;
  let router:Router;
  let googleMapsService:GoogleMapsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule ,RouterTestingModule.withRoutes([{path: '', component: LoginComponent}])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MapDetailComponent, LoginComponent ],
      providers: [GoogleMapsService, AuthService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDetailComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    googleMapsService = TestBed.get(GoogleMapsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
  
    it('should route to  "" if the user.userId is false ', fakeAsync(() => {
      let navigateSpy = spyOn(router, 'navigate');
      authService.user = new User();
      authService.user.userId = 0;
      component.ngOnInit();
  
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    }));
  
    it('should call getUserInfo is the userId is not falsy', () => {
      spyOn(component, 'getUserInfo');
      
      authService.user = new User();
      authService.user.userId = 1;
      component.ngOnInit();
  
      expect(component.getUserInfo).toHaveBeenCalled();
    });
  })

  describe('getUserInfo', () => {
    it('should call getDriverRecommendations if the user is valid', fakeAsync(() =>{
      const mockUser = new User();
      mockUser.userId = 1;

      spyOn(userService, 'getUserById').and.returnValue(Promise.resolve(mockUser));
      spyOn(component, 'getDriverRecommendations').and.callThrough();

      authService.user = mockUser;
      component.ngOnInit();
      tick();

      expect(component.getDriverRecommendations).toHaveBeenCalled();
    }));

    it("should route to LoginComponent if the user is an invalid user", fakeAsync(() =>{
      let invalidUser;
      let mockUser = new User();
      mockUser.userId = 1;

      spyOn(userService, 'getUserById').and.returnValue(Promise.resolve(invalidUser));
      const navigationSpy = spyOn(router, 'navigate');

      authService.user = mockUser;
      component.ngOnInit();
      tick();

      expect(navigationSpy).toHaveBeenCalledWith(['']);

    }));
  });
  
  describe("getDriverRecommendations", () => {
    it('should set recommendations using GoogleMapService', fakeAsync(() => {
      const mockUsers:User[] = [
        new User(),
        new User(),
        new User()
      ];

      mockUsers.forEach((user, index) => {
        user.userId = index;
      });
      spyOn(googleMapsService, 'getDriverRecommendations').and.returnValue(of(mockUsers));

      const numberOfRecs = 5;
      const rider:User = new User();
      rider.userId = 10;
      component.getDriverRecommendations(numberOfRecs, rider);
      tick();

      expect(component.recommendations).toEqual(mockUsers);
    }));

    it('should call GoogleMapsService setCoordinatesList with markerList', fakeAsync(() => {
      const mockUsers:User[] = [
        new User(),
        new User(),
        new User()
      ];

      mockUsers.forEach((user, index) => {
        user.userId = index;
        user.longitude = 100;
        user.latitude = 200;
      });

      spyOn(googleMapsService, 'getDriverRecommendations').and.returnValue(of(mockUsers));
      let mapsServiceSpy = spyOn(googleMapsService, 'setCoordinatesList');

      const numberOfRecs = 5;
      const rider:User = new User();
      rider.userId = 10;
      component.getDriverRecommendations(numberOfRecs, rider);
      tick();

      expect(mapsServiceSpy).toHaveBeenCalled();
    }));
  });

});
