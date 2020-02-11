import { TestBed } from "@angular/core/testing";
import { UserService } from 'src/app/services/user-service/user.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { of, Observable } from 'rxjs';

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

  fit("should create LoginComponent", () => {
    expect(loginComponent).toBeTruthy();
  });

  fit("should get a list of users from UserService on init", (done) => {
    spyOn(userService, "getAllUsers").and.returnValue(of(mockUsers));
    loginComponent.ngOnInit();
    done();
    let totalPageExpectation = Math.ceil(loginComponent.allUsers.length / 5);
    let usersExpectation = loginComponent.allUsers.slice(0,5);
    expect(loginComponent.allUsers).toEqual(mockUsers);
    expect(loginComponent.totalPage).toBe(totalPageExpectation);
    expect(loginComponent.users).toEqual(usersExpectation);
  });


})


