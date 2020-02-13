import { TestBed } from "@angular/core/testing";
import { UserService } from 'src/app/services/user-service/user.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { of, Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { request } from 'http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { log } from 'util';
describe("Login Component", () => {
  let userService:UserService;
  let loginComponent:LoginComponent;
  let httpMock:HttpTestingController;
  let authService:AuthService;

  let mockUsers:User[] = [
    {userId: 1, 
      userName: "johns", 
      firstName: "John", 
      lastName: "Smith",
      phoneNumber: "5555555555",
      email: "email@email.com",
      driver: false, 
      batch: {batchLocation: "123abc", batchNumber: 123},
      acceptingRides: false,
      active: true},
    {userId: 2, 
      userName: "kimj", 
      firstName: "Kim", 
      lastName: "Jhonson",
      phoneNumber: "5555555555",
      email: "email@email.com",
      driver: false, 
      batch: {batchLocation: "123abc", batchNumber: 123},
      acceptingRides: false,
      active: true},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [LoginComponent],
      providers: [UserService, AuthService],
      imports: [
        FormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule]

  class MockUserService{
    getAllUsers():Observable<User[]>{
      return of(mockUsers);
    }
  }

  let mockUsers:User[] = [
    {userId: 1, 
      userName: "johns", 
      firstName: "John", 
      lastName: "Smith",
      phoneNumber: "5555555555",
      email: "email@email.com",
      driver: false, 
      batch: {batchLocation: "123abc", batchNumber: 123},
      acceptingRides: false,
      active: true},
    {userId: 2, 
      userName: "kimj", 
      firstName: "Kim", 
      lastName: "Jhonson",
      phoneNumber: "5555555555",
      email: "email@email.com",
      driver: false, 
      batch: {batchLocation: "123abc", batchNumber: 123},
      acceptingRides: false,
      active: true},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [UserService],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    let fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create LoginComponent", () => {
    expect(loginComponent).toBeTruthy();
  });

  it("should get a list of users from UserService on init", (done) => {
    spyOn(userService, "getAllUsers").and.returnValue(of(mockUsers));
    loginComponent.ngOnInit();
    done();
    let totalPageExpectation = Math.ceil(loginComponent.allUsers.length / 5);
    let usersExpectation = loginComponent.allUsers.slice(0,5);
    expect(loginComponent.allUsers).toEqual(mockUsers);
    expect(loginComponent.totalPage).toBe(totalPageExpectation);
    expect(loginComponent.users).toEqual(usersExpectation);
  });

  describe("changeUser function", () => {
    it("should show drop down in the changeUser funciton is called", () => {
      loginComponent.showDropDown = true;
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.showDropDown).toBeFalsy();
    }); 
  
    it("should set curPage variable to 1 when changeUser is called", () => {
      loginComponent.curPage = 0;
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.curPage).toBe(1);
    });
  
    it("should set totalPage variable based on allUsers variable", () => {
      loginComponent.allUsers = mockUsers;
      let totalPageExpectation = Math.ceil(loginComponent.allUsers.length / 5);
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.totalPage).toBe(totalPageExpectation);
    });

    it("should set user variable based on allUsers variable", () => {
      let curPage = 1;
      let expectedUsers = mockUsers.slice(curPage * 5 - 5, curPage * 5);
      loginComponent.allUsers = mockUsers;
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.users).toEqual(expectedUsers);
    });

    it("should set chosenUserFullName variable based on user variable", () => {
      let expectedChosenFullName = `${mockUsers[0].firstName} ${mockUsers[0].lastName}: ${mockUsers[0].driver ? "Drive" : "Rider"}`;
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.chosenUserFullName).toEqual(expectedChosenFullName);
    });

    it("should set chosenUser varible to passed user argument", () => {
      loginComponent.changeUser(mockUsers[0]);
      expect(loginComponent.chosenUser).toEqual(mockUsers[0]);
    });
  });

  describe("searchAccount function", () => {
    it("should set the showDropDown variable to true", () => {
      loginComponent.showDropDown = false;
      loginComponent.searchAccount();
      expect(loginComponent.showDropDown).toBeTruthy();
    })

    it("should set users and totalPage based off of searchAccount function", () => {
      loginComponent.chosenUserFullName = `${mockUsers[0].firstName} ${mockUsers[0].lastName}: ${mockUsers[0].driver ? "Driver" : "Rider"}`;

      loginComponent.allUsers = mockUsers;

      loginComponent.searchAccount();

      expect(loginComponent.users.every( user => mockUsers.includes(user) )).toBeTruthy();

      expect(loginComponent.totalPage).toEqual(Math.ceil(loginComponent.users.length / 5));
    });

    it("should set curPage, totalPage and users based off of allUsers", () => {
      loginComponent.chosenUserFullName = "";
      loginComponent.allUsers = mockUsers;
      loginComponent.searchAccount();
      expect(loginComponent.curPage).toBe(1);
      expect(loginComponent.totalPage).toEqual(Math.ceil(loginComponent.allUsers.length / 5)); 
      expect(loginComponent.users).toEqual(mockUsers.slice(loginComponent.curPage * 5 - 5, loginComponent.curPage * 5));
    });
  });

  it("should toggle showDropDown", () => {
    loginComponent.showDropDown = false;
    loginComponent.toggleDropDown();
    expect(loginComponent.showDropDown).toBeTruthy();
    loginComponent.toggleDropDown();
    expect(loginComponent.showDropDown).toBeFalsy();
  });

  describe("nextPage function", () => {
    it("should increase the curPage variable it nextPage() is called", () => {
      loginComponent.curPage = 1;
      loginComponent.nextPage();
      expect(loginComponent.curPage).toBe(2);
      loginComponent.nextPage();
      expect(loginComponent.curPage).toBe(3);
    });

    // I don't know why this is not working try again later
    it("should update users variable when nextPage() is called", () => {
      loginComponent.curPage = 1; 
      loginComponent.allUsers = [...mockUsers];
      let expectedUsers = mockUsers.slice(1 * 5 - 5, 1 * 5);
      loginComponent.nextPage();

      expect(loginComponent.users).toEqual(expectedUsers);
    });
  })

  describe("loginFailed() and loginBanned() functions", () => {
    it("should reset userName if loginFailed is called", () => {
      loginComponent.userName = "P_Parker";
      loginComponent.loginBanned();
      expect(loginComponent.userName).toBeFalsy();
    });
  
    it('should set failed flag variable to true', () => {
      loginComponent.failed = false;
      loginComponent.loginFailed();
      expect(loginComponent.failed).toBeTruthy();
    });
    
    it("should reset user name if loginBanned is called", () => {
      loginComponent.userName = "B_Banner";
      loginComponent.loginBanned();
      expect(loginComponent.userName).toBeFalsy();
    });
    
    it("should set banned flag to true if loginBanned is called", () => {
      loginComponent.banned = false;
      loginComponent.loginBanned();
      expect(loginComponent.banned).toBeTruthy();
    })
  });

  describe("login function", () => {
    it("should make a GET request to get a list of Users", (done) => {
      loginComponent.userName = "B_Wayne";

      loginComponent.login();
      done();

      let request = httpMock.expectOne(`${environment.userUri}?username=${loginComponent.userName}`);
      expect(request.request.method).toBe("GET");
    })

    it("should call loginFailed if there are no users", (done) => {
      spyOn(loginComponent, "loginFailed").and.callThrough();
      loginComponent.userName = "P_Parker";
      loginComponent.login();
      done();

      httpMock.expectOne(`${environment.userUri}?username=${loginComponent.userName}`).flush([]);
      expect(loginComponent.loginFailed).toHaveBeenCalled();
    });
    
    it("should call loginBanned if the chosenUser active state is set to false", (done) => {
      spyOn(loginComponent, "loginBanned").and.callThrough();
      loginComponent.chosenUser = mockUsers[0];
      loginComponent.chosenUser.active = false;
      loginComponent.login();
      done();
      httpMock.expectOne(`${environment.userUri}?username=${loginComponent.userName}`).flush(mockUsers);
      expect(loginComponent.loginBanned).toHaveBeenCalled();
    });

    it("should call loginFailed is the authService login returns false", (done) => {
      spyOn(authService, "login").and.returnValue(false);
      spyOn(loginComponent, "loginFailed").and.callThrough();
      loginComponent.chosenUser = mockUsers[0];
      loginComponent.chosenUser.active = true;
      loginComponent.userName = mockUsers[0].userName;

      loginComponent.login();
      done();

      httpMock.expectOne(`${environment.userUri}?username=${loginComponent.userName}`).flush(mockUsers);
      expect(loginComponent.loginFailed).toHaveBeenCalled();
    });
  }); 

  });

  fdescribe("nextPage function", () => {
    it("should increase the curPage variable it nextPage() is called", () => {
      loginComponent.curPage = 1;
      loginComponent.nextPage();
      expect(loginComponent.curPage).toBe(2);
      loginComponent.nextPage();
      expect(loginComponent.curPage).toBe(3);
    });

    it("should update users variable when nextPage() is called", () => {
      loginComponent.curPage = 1;
      loginComponent.allUsers = mockUsers;
      let expectedUsers = mockUsers.slice(loginComponent.curPage * 5 - 5, loginComponent.curPage * 5);

      loginComponent.nextPage();

      expect(loginComponent.users).toEqual(expectedUsers);
    });
  })
})


