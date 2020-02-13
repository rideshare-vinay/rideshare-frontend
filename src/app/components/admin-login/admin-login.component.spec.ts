import { TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth-service/auth.service';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let adminService: AdminService;
  let authService: AuthService;

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
      declarations: [AdminLoginComponent],
      providers: [AdminService],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    adminService = TestBed.get(AdminService);
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
    component.changeAdmin(mockAdmins[0]);
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
      expect(component.failed).toEqual(true);
    });

    it('should login from authService loginAsAdmin', () => {
      const admin = component.chosenAdmin = mockAdmins[0];
      component.login();
      expect(authService.loginAsAdmin).toHaveBeenCalledWith({ adminId: admin.adminId, userName: admin.userName });
      expect(component.failed).toEqual(false);
    });
  });

});
