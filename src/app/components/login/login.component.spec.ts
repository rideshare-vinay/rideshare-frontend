import { TestBed } from "@angular/core/testing";
import { UserService } from 'src/app/services/user-service/user.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { of, Observable } from 'rxjs';
import { log } from 'util';

describe("Login Component", () => {
  let userService:UserService;
  let loginComponent:LoginComponent;

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

  fdescribe("searchAccount function", () => {
    it("should set the showDropDown variable to true", () => {
      loginComponent.showDropDown = false;
      loginComponent.searchAccount();
      expect(loginComponent.showDropDown).toBeTruthy();
    })

    it("should set users based off of searchAccount function", () => {
      loginComponent.chosenUserFullName = `${mockUsers[0].firstName} ${mockUsers[0].lastName}: ${mockUsers[0].driver ? "Driver" : "Rider"}`;

      loginComponent.allUsers = mockUsers;

      loginComponent.searchAccount();

      expect(loginComponent.users.every( user => mockUsers.includes(user) )).toBeTruthy();
      
    });
  });
})


