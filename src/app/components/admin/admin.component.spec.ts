import { TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { Admin } from 'src/app/models/admin';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { EPERM } from 'constants';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let authService: AuthService;
  let userService: UserService;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let mockAdmin: Admin;

  let mockUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AdminComponent, LoginComponent],
      providers: [
        AuthService
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{path: "", component: LoginComponent}])]
    });
    const fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    mockAdmin = {
      adminId: 1,
      userName: 'admin'
    };

    mockUsers =  [
      {
        userId: 1,
        userName: 'user1',
        firstName: 'john',
        lastName: 'smith',
        phoneNumber: '1234567890',
        email: 'email@email.com',
        driver: false,
        batch: { batchLocation: '123abc', batchNumber: 123 },
        acceptingRides: false,
        active: true,
        address: "address",
        latitude: 123,
        longitude: 456
      },
      {
        userId: 2,
        userName: 'user2',
        firstName: 'kim',
        lastName: 'jhonson',
        phoneNumber: '0123456789',
        email: 'email@email.com',
        driver: false,
        batch: { batchLocation: '123abc', batchNumber: 123 },
        acceptingRides: false,
        active: true,
        address: "address",
        latitude: 123,
        longitude: 456
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should get a list of users from userService', () => {
      spyOn(userService, 'showAllUser').and.returnValue(of(mockUsers));
      authService.admin = mockAdmin;
      component.ngOnInit();
      expect(component.listofUsers).toEqual(mockUsers);
    });

    it('should redirect if not auth Admin', () => {
      const spy = spyOn(router, "navigate");
      mockAdmin.adminId = 0;
      authService.admin = mockAdmin;
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith(['/']);
    });
  });

  it('should logout when session clear', () => {
    let navigateSpy = spyOn(router, "navigate");
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should get a list of users from searchUser function', () => {
    let searchText = mockUsers[1].userName;
    component.listofUsers = mockUsers;
    component.searchText = searchText;
    component.searchUser();
    expect(component.users).toEqual(mockUsers.filter( user => user.userName.toLowerCase().includes(searchText.toLowerCase())));
  });

  it('should ban inactive user from banning function', () => {
    mockUsers[0].active = false;
    component.banning(mockUsers[0]);
    expect(mockUsers[0].active).toBe(true);
  });

});
