import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let adminService: AdminService;
  let authService: AuthService;
  let httpMock:HttpTestingController;

  class mockAdminEvent{
    target = {
      selectedIndex: 0,
    };
  }

  const mockAdmins: Admin[] = [
    {
      adminId: 1,
      userName: 'admin1'
    },
    {
      adminId: 2,
      userName: 'admin2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [AdminLoginComponent],
      providers: [AdminService],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    adminService = TestBed.get(AdminService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of admins from AdminService on init', () => {
    spyOn(adminService, 'getAllAdmins').and.returnValue(of(mockAdmins));
    component.ngOnInit();
    expect(component.admins).toEqual(mockAdmins);
  });

  it('should set chosenAdmin from event on changeAdmin function', () => {
    component.admins = mockAdmins;

    let mockEvent = new mockAdminEvent();
    mockEvent.target.selectedIndex = 0;
    component.changeAdmin(mockEvent);
    expect(component.chosenAdmin).toEqual(mockAdmins[0]);
  });

  it('should fail login from empty userName on loginFailed function', () => {
    component.loginFailed();
    expect(component.failed).toEqual(true);
  });

  describe('login function', () => {
    it('should not login from other adminId', () => {
      const admin = component.chosenAdmin = mockAdmins[0];
      admin.adminId = 2;
      component.login();
      expect(component.failed).toEqual(false);
    });
  });

});
