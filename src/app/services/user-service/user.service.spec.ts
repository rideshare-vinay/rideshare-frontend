import { UserService } from "./user.service";
import { User } from 'src/app/models/user';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let userService:UserService;
  let httpMock:HttpTestingController;
  let mockUsers:User[] = [
            {
              userId: 1,
              userName: 'carsryan',
              batch: {
                batchNumber: 1,
                batchLocation: '123'
              },
              firstName: 'Ryan',
              lastName: 'Carstons',
              email: 'ryan@gmail.com',
              phoneNumber: '1231231231',
              driver: true,
              active: true,
              acceptingRides: true,
              address: "address",
              longitude: 123,
              latitude: 456,
            },
            {
              userId: 2,
              userName: 'pwin',
              batch: {
                batchNumber: 2,
                batchLocation: '456'
              },
              firstName: 'Peter',
              lastName: 'Nguyen',
              email: 'pete@gmail.com',
              phoneNumber: '3213213213',
              driver: true,
              active: true,
              acceptingRides: true,
              address: "address",
              longitude: 123,
              latitude: 456
            }
          ];

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create UserService", () => {
    expect(UserService).toBeTruthy();
  });

  it("should get all users from an API via a GET Request", () => {
    userService.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    })

    let request = httpMock.expectOne(userService.url);
    expect(request.request.method).toBe("GET");

    request.flush(mockUsers);
  });

  it("should get user by Id from an API via a GET Request", () => {
    userService.getUserById(mockUsers[0].userId).then(user => {
      expect(user).toEqual(mockUsers[0]);
    });

    let request = httpMock.expectOne(userService.url + mockUsers[0].userId);
    expect(request.request.method).toBe("GET");

    request.flush(mockUsers[0]);
  });

  it("should get driver by Id from an API via a GET Request", () => {
    userService.getDriverById(mockUsers[0].userId).subscribe(user => {
      expect(user).toEqual(mockUsers[0]);
    });

    let request = httpMock.expectOne(userService.url + mockUsers[0].userId);
    expect(request.request.method).toBe("GET");

    request.flush(mockUsers[0]);
  });

  it("should get a list of all users from an API via a GET Request", () => {
    userService.showAllUser().subscribe(users => {
      expect(users).toEqual(mockUsers);
    })

    let request = httpMock.expectOne(userService.url);
    expect(request.request.method).toBe("GET");

    request.flush(mockUsers);
  });

  it("should get a list of riders given a location from an API via a GET Request", () => {
    let batchLocation = "somelocation";
    userService.getRidersForLocation(batchLocation).subscribe(riders => {
      expect(riders).toEqual(mockUsers);
    });

    let request = httpMock.expectOne(userService.url + '?is-driver=false&location=' + batchLocation);
    expect(request.request.method).toBe("GET");

    request.flush(mockUsers);
  });

  it("should change driver status to accepting rides using an API via a POST request", () => {
    let user: User = {
      userId: 300,
      userName: "killainC",
      firstName: "Killian",
      lastName: "Cumberbatch",
      email: "email@email.com",
      phoneNumber: "5555555555",
      driver: true, 
      acceptingRides: false, 
      active: true, 
      batch: {batchLocation: "somewhere", batchNumber: 123},
      address: "address",
      latitude: 123,
      longitude: 456
    }; 

    userService.changeDriverIsAccepting(user).subscribe( updatedUser =>{
      expect(updatedUser).toEqual(user);
    });

    let request = httpMock.expectOne(userService.url + user.userId);
    expect(request.request.method).toBe("PUT");
    request.flush(user);
  });

  it("should update user information using an API via a PUT Request", () => {
    userService.updateUserInfo(mockUsers[0]).then(user => {
      expect(user).toEqual(mockUsers[0]);
    });

    let request = httpMock.expectOne(userService.url + mockUsers[0].userId);
    expect(request.request.method).toBe("PUT");
    request.flush(mockUsers[0]);
  });

  // it('should ban inactive user from banning function', () => {
  //   mockUsers[0].active = false;
  //   component.banning(mockUsers[0]);
  //   expect(mockUsers[0].active).toBe(true);
  // });

});