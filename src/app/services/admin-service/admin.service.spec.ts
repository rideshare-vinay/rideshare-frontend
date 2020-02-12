import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { Admin } from 'src/app/models/admin';
import { DriverInfoComponent } from  'src/app/components/driver-info/driver-info.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';

describe('AdminService', () => {
  let adminService: AdminService;
  let httpMock: HttpTestingController;
  let mockAdmih: Admin = { adminId: 0, userName:"test0"};
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent, DriverInfoComponent, DriverComponent, LoginComponent, 
        AdminLoginComponent, RegisterComponent, CarRegisterComponent, MyCarComponent,
        ProfileComponent, PreferenceComponent
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, HttpClientTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
    })
    adminService = TestBed.get(AdminService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(adminService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify;
  })

  it('should return a list of admins from the API via GET', () => {
    let mockAdmins: Admin[] = [
      {adminId: 1, userName:"test1"},
      {adminId: 2, userName:"test2"},
      {adminId: 3, userName:"test3"},
      {adminId: 4, userName:"test4"},
    ]
    adminService.getAllAdmins().subscribe(admins => {
      expect(admins.length).toBe(4);
      expect(admins).toEqual(mockAdmins);
    })
    
    const request = httpMock.expectOne(adminService.url);
    expect(request.request.method).toBe("GET");
    request.flush(mockAdmins);
    // const adminResponse = [
    //   {
    //     adminId: 1,
    //     userName: "test1"
    //   },
    //   {
    //     adminId: 2,
    //     userName: "test2"
    //   }
    // ];
    // let admins;
    // spyOn(adminService, 'getAllAdmins').and.returnValue(of(adminResponse));
    // adminService.getAllAdmins().subscribe(response => {
    //   admins = response;
    // });
    // expect(admins).toEqual(adminResponse);
  });

});