import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ProfileComponent } from './profile.component';
import { AdminComponent } from '../admin/admin.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { DriverComponent } from '../driver/driver.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { UserService } from 'src/app/services/user-service/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';

describe('ProfileComponent', () => {
  let myProfileComponent: ProfileComponent;
  let myProfileFixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: AuthService;
  let mockValidationService: ValidationService;
  let mockUserService: UserService;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate']);
  let mockUser: User = {
    userId: 1,
    userName: "testing",
    batch: { batchLocation: "abc123", batchNumber: 123 },
    firstName: "jon",
    lastName: "smith",
    email: "test",
    phoneNumber: "also a test",
    active: true,
    driver: true,
    acceptingRides: true
  };

  class MockAuthService {
    user: User
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AdminComponent, DriverInfoComponent,
        DriverComponent, LoginComponent,
        AdminLoginComponent, RegisterComponent,
        CarRegisterComponent, MyCarComponent,
        ProfileComponent, PreferenceComponent,
        MapDetailComponent],
      imports: [HttpClientModule, AppRoutingModule,
        FormsModule, RouterTestingModule,
        RouterModule],
      providers: [{
        provide: Router ,useValue: routerSpy
      }]
    })
    // .compileComponents();
    myProfileFixture = TestBed.createComponent(ProfileComponent);
    myProfileComponent = myProfileFixture.componentInstance;
    mockUserService = TestBed.get(UserService);
    mockAuthService = TestBed.get(AuthService);
    mockValidationService = TestBed.get(ValidationService);
  });

  it('should create myProfileComponent', () => {
    expect(myProfileComponent).toBeTruthy();
  });

  it("it should have no user set after construction", () => {
    expect(myProfileComponent.user.userId).toBeUndefined();
  })

  it("should set user id within myProfileComponent after ngOnInit", (done) => {
    mockAuthService.user = mockUser;
    myProfileComponent.ngOnInit();
    expect(myProfileComponent.user.userId).toEqual(mockUser.userId);
    done();
  })

  it("should redirect if userid is not true", (done) => {
    mockUser.userId = null;
    mockAuthService.user = mockUser;
    myProfileComponent.ngOnInit();
    done();

    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toEqual(['']);
  })

  it("should call user info when running ngOnInit", (done) => { 
    mockUser.userId = 1;
    spyOn(mockUserService, 'getUserById').and.returnValue(Promise.resolve(mockUser))
    myProfileComponent.user.userId = mockUser.userId;
    myProfileComponent.ngOnInit();
    done();
    // mockUserService.getUserById(mockUser.userId).then(user => {
    //   expect(myProfileComponent.user).toEqual(mockUser);
    //   done();
    // })
  })

  // it('should return user info', () => {

  //   let spy: any;
  //   spy = spyOn(component, 'getUserInfo');

  //   component.getUserInfo();
  //   expect(spy).toHaveBeenCalled();
  // })

  // it('should compare user info', () => {
  //   let mockUser: User = {
  //     userId: 1, userName: "testing", batch: new Batch(),
  //     firstName: "jon", lastName: "smith", email: "test", phoneNumber: "also a test",
  //     active: true, driver: true, acceptingRides: true
  //   }
  //   let spy: any;
  //   spy = spyOn(component, 'compareUser');

  //   component.compareUser();
  //   expect(spy).toHaveBeenCalled();
  // })

});
