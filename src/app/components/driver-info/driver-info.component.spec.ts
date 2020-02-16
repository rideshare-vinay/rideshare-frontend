import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { DriverInfoComponent } from './driver-info.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { DriverComponent } from '../driver/driver.component';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { LoginComponent } from '../login/login.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminComponent } from '../admin/admin.component';
import { RegisterComponent } from '../register/register.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { ProfileComponent } from '../profile/profile.component';
import { PreferenceComponent } from '../preference/preference.component';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { Observable, of } from 'rxjs';
import { resolve } from 'url';
import { CarService } from 'src/app/services/car-service/car.service';

describe('DriverInfoComponent', () => {
  let driverInfoComponent: DriverInfoComponent;
  let driferInfoFixture: ComponentFixture<DriverInfoComponent>;
  let mockAuthService: AuthService;
  let mockCarService: CarService;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate']);
  let mockUser: User;
  let mockBatches: Batch[] = [
    { batchNumber: 1, batchLocation: 'VWU - Morgantown, WV' },
    { batchNumber: 2, batchLocation: 'UTA - Arlington, TX' },
    { batchNumber: 3, batchLocation: 'USF - Tampa, FL' },
    { batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA' },
    { batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY' },
    { batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY' }
  ];
  let mockCar: Car;
  let mockCars: Car[];

  class MockCarService {
    getCarByUserId(userId: number) {
      return new Promise((resolve, reject) => {
        resolve(mockCar);
      });
    }
    removeCar(carId: number): Observable<Car> {
      return of(mockCar);
    }
    getAllCars() {
      return new Promise((resolve, reject) => {
        resolve(of(mockCars));
      });
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DriverInfoComponent,
        DriverComponent,
        MapDetailComponent,
        LoginComponent,
        AdminLoginComponent,
        AdminComponent,
        RegisterComponent,
        CarRegisterComponent,
        MyCarComponent,
        ProfileComponent,
        PreferenceComponent,
        GoogleMapsComponent
      ],
      imports: [HttpClientModule, AppRoutingModule,
        FormsModule, RouterTestingModule,
        RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    driferInfoFixture = TestBed.createComponent(DriverInfoComponent);
    driverInfoComponent = driferInfoFixture.componentInstance;
    mockCarService = TestBed.get(CarService);
    mockAuthService = TestBed.get(AuthService);
    driferInfoFixture.detectChanges();
    mockUser = {
      userId: 1,
      userName: "testing",
      batch: { batchNumber: 1, batchLocation: 'UTA - Arlington, TX' },
      firstName: "jon",
      lastName: "smith",
      email: "test",
      phoneNumber: "also a test",
      active: true,
      driver: true,
      acceptingRides: true,
      address: "123 liv+",
      latitude: 45,
      longitude: 45
    };
    mockCar = {
      carId: 1,
      color: "red",
      make: "Jumbo",
      model: "T54",
      seats: 5,
      user: mockUser,
      year: 2012
    };
    mockCars =  [
      {
        carId: 1,
        color: "red",
        make: "Jumbo",
        model: "T54",
        seats: 5,
        user: mockUser,
        year: 2012
      },
      {
        carId: 2,
        color: "red",
        make: "Jumbo",
        model: "T54",
        seats: 5,
        user: mockUser,
        year: 2013
      },
      {
        carId: 3,
        color: "red",
        make: "Jumbo",
        model: "T54",
        seats: 5,
        user: mockUser,
        year: 2014
      }
    ];
  });

  it('should create', () => {
    expect(driverInfoComponent).toBeTruthy();
  });

  it('should redirect if user id is null', (done) => {
    driverInfoComponent.ngOnInit()
    done();

    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toEqual(['']);
  })

  it('should get cars if user passes in auth service', () => {
    mockAuthService.user = mockUser
    spyOn(mockCarService,"getAllCars").and.returnValue(of(mockCars));
    driverInfoComponent.ngOnInit();
    
    let expectedCars = mockCars.filter(car => car.user.acceptingRides);
    for(let car of expectedCars){
      expect(driverInfoComponent.allAvailableCars).toContain(car)
    }
  });

  it('should order available cars by year if orderyear is false', () =>{
    driverInfoComponent.availableCars = mockCars;
    driverInfoComponent.orderByYear();
    expect(driverInfoComponent.availableCars).toEqual(mockCars.sort((a, b) => b.year - a.year));
  })

  it('should order available cars by year if orderyear is true', () =>{
    driverInfoComponent.orderYear = true
    driverInfoComponent.availableCars = mockCars;
    driverInfoComponent.orderByYear();
    expect(driverInfoComponent.availableCars).toEqual(mockCars.sort((a, b) => a.year - b.year));
  })

  it('should order by fullname if orderFirtname is false',() =>{
    driverInfoComponent.availableCars = mockCars;
    driverInfoComponent.orderByFullName();
    expect(driverInfoComponent.availableCars).toEqual(mockCars.sort((a, b) => a.user.firstName > b.user.firstName ? 1 : -1));
  })

  it('should order by fullname if orderFirtname is true',() =>{
    driverInfoComponent.orderFirstName = true;
    driverInfoComponent.availableCars = mockCars;
    driverInfoComponent.orderByFullName();
    expect(driverInfoComponent.availableCars).toEqual(mockCars.sort((a, b) => a.user.firstName > b.user.firstName ? -1 : 1));
  })

});
