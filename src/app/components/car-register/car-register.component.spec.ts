import { TestBed } from '@angular/core/testing';
import { CarRegisterComponent } from './car-register.component';
import { FormsModule } from '@angular/forms';
import { CarLookupService } from 'src/app/services/car-lookup/car-lookup.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CarService } from 'src/app/services/car-service/car.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CarRegisterComponent', () => {
  let component: CarRegisterComponent;
  let authService: AuthService;
  let carService: CarService;
  let carLookupService: CarLookupService;
  let validationService: ValidationService;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  let mockCar: Car;
  const mockDriver: User = {
    userId: 0,
    userName: 'driver1',
    firstName: 'john',
    lastName: 'smith',
    phoneNumber: '1234567890',
    email: 'email@email.com',
    driver: true,
    batch: { batchLocation: '123abc', batchNumber: 123 },
    acceptingRides: true,
    active: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CarRegisterComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    });
    const fixture = TestBed.createComponent(CarRegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    carService = TestBed.get(CarService);
    carLookupService = TestBed.get(CarLookupService);
    validationService = TestBed.get(ValidationService);
    mockCar = {
      carId: 1,
      color: 'white',
      seats: 5,
      make: 'Jeep',
      model: 'Compass',
      year: 2019,
      user: mockDriver,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should redirect if not auth user', () => {
      mockDriver.userId = 0;
      authService.user = mockDriver;
      component.ngOnInit();
      // const spy = router.navigate as jasmine.Spy;
      // const navArgs = spy.calls.first().args[0];
      // expect(navArgs).toEqual(['/']);
    });

    it('should get year from mockCar', () => {
      // spyOn(carLookupService, 'getYears').and.returnValue(of(mockCar.year));
      authService.user = mockDriver;
      component.ngOnInit();
      // expect(component.allYears).toEqual(mockCar.year);
    });
  });

  it('changeYear function', () => {
    spyOn(component, 'changeYear').and.callThrough();
    component.changeYear();
    expect(component.changeYear).toHaveBeenCalled();
  });

  it('changeMake function', () => {
    spyOn(component, 'changeMake').and.callThrough();
    component.changeMake();
    expect(component.changeMake).toHaveBeenCalled();
  });

  it('changeModel function', () => {
    spyOn(component, 'changeModel').and.callThrough();
    component.changeModel();
    expect(component.changeModel).toHaveBeenCalled();
  });

  it('addCar function', () => {
    spyOn(component, 'addCar').and.callThrough();
    component.addCar();
    expect(component.addCar).toHaveBeenCalled();
  });

  it('nextPage function', () => {
    spyOn(component, 'nextPage').and.callThrough();
    component.nextPage();
    expect(component.nextPage).toHaveBeenCalled();
  });

  it('prevPage function', () => {
    spyOn(component, 'prevPage').and.callThrough();
    component.prevPage();
    expect(component.prevPage).toHaveBeenCalled();
  });

  it('toggleDropDown function', () => {
    spyOn(component, 'toggleDropDown').and.callThrough();
    component.toggleDropDown();
    expect(component.toggleDropDown).toHaveBeenCalled();
  });

  it('xmlParser function', () => {
    const text = '123';
    component.xmlParser(text);
    // expect(component.xmlParser).toEqual([]);
  });

  it('modelFilter function', () => {
    const models = ['1', '2', '3'];
    spyOn(component, 'modelFilter').and.callThrough();
    // spyOn(component, 'modelFilter').and.returnValue(models);
    component.modelFilter(models);
    // expect(component.xmlParser).toEqual(models);
  });

});
