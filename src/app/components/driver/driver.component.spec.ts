import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DriverComponent } from './driver.component';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';


describe('DriverComponent', () => {
  let component: DriverComponent;
  let userService: UserService;
  let carService: CarService;
  let authService: AuthService;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  let mockDriver: User;
  const mockCar: Car = {
    carId: 1,
    color: 'white',
    seats: 5,
    make: 'Jeep',
    model: 'Compass',
    year: 2019,
    user: mockDriver,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DriverComponent],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    carService = TestBed.get(CarService);
    mockDriver = {
      userId: 1,
      userName: 'driver1',
      firstName: 'john',
      lastName: 'smith',
      phoneNumber: '1234567890',
      email: 'email@email.com',
      driver: true,
      batch: { batchLocation: '123abc', batchNumber: 123 },
      acceptingRides: true,
      active: true,
      address: "address",
      latitude: 123,
      longitude: 456
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should get driver by userId from userService', () => {
      spyOn(userService, 'getDriverById').and.returnValue(of(mockDriver.userId));
      authService.user = mockDriver;
      component.ngOnInit();
      expect(component.userId).toEqual(mockDriver.userId);
    });

    it('should redirect if not auth driver', () => {
      mockDriver.userId = 0;
      authService.user = mockDriver;
      component.ngOnInit();
      const spy = router.navigate as jasmine.Spy;
      const nav = spy.calls.first().args[0];
      expect(nav).toEqual(['']);
    });
  });

  it('should get car by userId from getDriverCar', fakeAsync(() => {
    spyOn(carService, 'getCarByUserId').and.returnValue(Promise.resolve(mockCar));
    component.getDriverCar(mockDriver.userId);
    tick();
    expect(component.myCar).toEqual(mockCar);
  }));

  describe('changeAcceptingRides function', () => {
    it('change acceptingRides to false', () => {
      component.userDriver = mockDriver;
      mockDriver.acceptingRides = false;
      component.changeAcceptingRides(mockDriver);
      expect(mockDriver.acceptingRides).toBeTruthy();
    });

    it('change acceptingRides to true', () => {
      component.userDriver = mockDriver;
      mockDriver.acceptingRides = false;
      component.changeAcceptingRides(mockDriver);
      expect(mockDriver.acceptingRides).toEqual(true);
    });
  });

  it('should redirect when logout', () => {
    component.logout();
    const spy = router.navigate as jasmine.Spy;
    const nav = spy.calls.first().args[0];
    expect(nav).toEqual(['']);
  });

});
