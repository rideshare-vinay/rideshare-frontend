import { TestBed, ComponentFixture, fakeAsync } from "@angular/core/testing";
import { MyCarComponent } from './my-car.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

describe("MyCarComponent", () => {
  let myCarComponent:MyCarComponent;
  let myCarFixture:ComponentFixture<MyCarComponent>;
  let mockAuthService:AuthService;
  let mockCarService:CarService;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate']);
  let mockUser:User; 
  let mockCar:Car;

  class MockAuthService{
    user:User;
  }

  class MockCarService{
    getCarByUserId(userId:number){
      return new Promise((resolve, reject) => {
        resolve(mockCar);
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService }, 
        { provide: Router, useValue: routerSpy },
        { provide: CarService, useClass: MockCarService }
      ]
    });
    myCarFixture = TestBed.createComponent(MyCarComponent); 
    myCarComponent = myCarFixture.componentInstance; 
    mockAuthService = TestBed.get(AuthService);
    mockCarService = TestBed.get(CarService);
    mockUser = {
      userId: 1, 
      userName: "killianC", 
      firstName: "Killian", 
      lastName: "Cumberbatch", 
      phoneNumber: "5555555555", 
      acceptingRides: false, 
      active: true, 
      batch: {batchLocation: "abc123", batchNumber: 123},
      driver: false, 
      email: "email@email.com"};
    mockCar = {
      carId: 1,
      color: "red",
      make: "Jumbo",
      model: "T54",
      seats: 5,
      user: mockUser,
      year: 2013
    }
  })

  it("should create MyCarComponent", () => {
    expect(myCarComponent).toBeTruthy();
  });

  it("should have no user set after construction", () => {
    expect(myCarComponent.userId).toBeUndefined();
  })

  it("should set user id within MyCarComponent after Angular calls ngOnInit", () => {
    mockAuthService.user = mockUser;
    myCarComponent.ngOnInit();
    expect(myCarComponent.userId).toEqual(mockUser.userId);
  });

  it("should redirect if userid is set to zero", () => {
    mockUser.userId = 0;
    mockAuthService.user = mockUser;
    myCarComponent.ngOnInit();

    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toEqual([""]);
  });

  it("should set myCar for the MyComponent if CarService gets valid user id", (done) => {
    mockAuthService.user = mockUser;
    myCarComponent.ngOnInit();
    mockCarService.getCarByUserId(mockUser.userId).then( car => {
      expect(myCarComponent.myCar).toEqual(mockCar);
      done();
    });
  });
});
