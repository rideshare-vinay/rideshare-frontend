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

describe('AdminComponent', () => {
  let component: AdminComponent;
  let authService: AuthService;
  let userService: UserService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let mockAdmin: Admin;

  const mockUsers: User[] = [
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
      active: true
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
      active: true
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    mockAdmin = {
      adminId: 1,
      userName: 'admin'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should get a list of users from AdminService', () => {
      spyOn(userService, 'showAllUser').and.returnValue(of(mockUsers));
      authService.admin = mockAdmin;
      component.ngOnInit();
      expect(component.adminId).toEqual(mockAdmin.adminId);
    });

    it('should redirect if not auth Admin', () => {
      mockAdmin.adminId = 0;
      authService.admin = mockAdmin;
      component.ngOnInit();
      const spy = routerSpy.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      expect(navArgs).toEqual(['/']);
    });
  });

  it('should logout when session clear', () => {
    component.logout();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['']);
  });

  it('should get a list of users from searchUser function', () => {
    spyOn(userService, 'showAllUser').and.returnValue(of(mockUsers));
    component.searchUser();
    expect(component.listofUsers).toEqual(mockUsers);
  });

  it('should ban inactive user from banning function', () => {
    mockUsers[0].active = false;
    component.banning(mockUsers[0]);
  });

});
