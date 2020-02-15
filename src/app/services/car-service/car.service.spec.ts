import { TestBed } from '@angular/core/testing';

import { Car } from 'src/app/models/car';
import { CarService } from './car.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { UserService } from '../user-service/user.service';


describe('CarService', () => {
  let carService: CarService;
  let httpMock: HttpTestingController;
  let mockUser: User = { userId: 1, acceptingRides: false, active: true, batch: null, driver: false, email: "dsjcsd", firstName: "dsjncskdnc", lastName: "jksdncksn", phoneNumber: "cknsdcnsdl", userName: "sjcnskd", address: "address", latitude: 123, longitude: 456 };
  let mockCar: Car = { carId: 1, color: "red", make: "Jenkin", model: "Simprola", seats: 7, user: mockUser, year: 2000 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    carService = TestBed.get(CarService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(carService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return list of cars from the API via a GET', () => {
    let mockCars: Car[] = [
      { carId: 1, color: "red", make: "Toyota", model: "Carola", seats: 4, year: 2010, user: null },
      { carId: 2, color: "green", make: "Honda", model: "Accord", seats: 4, year: 2016, user: null },
      { carId: 3, color: "blue", make: "BMW", model: "B350", seats: 2, year: 2013, user: null },
    ];

    carService.getAllCars().subscribe(cars => {
      expect(cars.length).toBe(3);
      expect(cars).toEqual(mockCars);
    });

    const request = httpMock.expectOne(carService.url);

    expect(request.request.method).toBe("GET");
    request.flush(mockCars);
  });

  it("should return a car based on user id from an API via a GET", () => {

    carService.getCarByUserId(mockUser.userId).then(car => {
      expect(car).toEqual(mockCar);
    });

    const request = httpMock.expectOne(`${carService.url}users/${mockUser.userId}`);

    expect(request.request.method).toBe("GET");

    request.flush(mockCar);
  });

  it("should remove car based on car id from an API via a DELETE", () => {
    carService.removeCar(mockCar.carId).subscribe( car => {
      expect(car).toEqual(mockCar);
    });
    
    let request = httpMock.expectOne(carService.url+mockCar.carId);

    expect(request.request.method).toBe("DELETE");
    request.flush(mockCar);
  });
});
