import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PreferenceComponent } from './preference.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { DriverComponent } from '../driver/driver.component';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user-service/user.service';

describe('PreferenceComponent', () => {
  let preferenceComponent: PreferenceComponent;
  let preferenceFixture: ComponentFixture<PreferenceComponent>;
  let mockAuthService: AuthService;
  let mockUserService: UserService;
  let mockUser: User;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate'])

  class MockAuthService {
    user: User;
  }

  class MockUserService {
    getUserById(userId: number) {
      return new Promise((resolve, reject) => {
        resolve(mockUser);
        reject();
      })
    }
    updateUserInfo(user) {
      return new Promise((resolve, reject) => {
        if(preferenceComponent.user.userId != mockUser.userId){
          reject(false);
        }else{
          resolve(mockUser)
        }
      })
    }
    updatePreference(property, bool, userId){
      
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PreferenceComponent,
        AdminComponent,
        CarRegisterComponent,
        RegisterComponent,
        LoginComponent,
        MyCarComponent,
        NavbarComponent,
        ProfileComponent,
        DriverComponent,
        MapDetailComponent,
        DriverInfoComponent,
        AdminLoginComponent,
        GoogleMapsComponent],
      imports: [
        HttpClientModule,
         AppRoutingModule, 
         FormsModule,
         RouterTestingModule,
         RouterModule
        ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useClass: MockUserService }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    preferenceFixture = TestBed.createComponent(PreferenceComponent);
    preferenceComponent = preferenceFixture.componentInstance;
    preferenceFixture.detectChanges();
    mockAuthService = TestBed.get(AuthService)
    mockUserService = TestBed.get(UserService)
    mockUser = {
      userId: 1,
      userName: "testChange",
      batch: { batchLocation: 'UTA - Arlington, TX', batchNumber: 2 },
      firstName: "Jon",
      lastName: "Smith",
      email: "test@test.com",
      phoneNumber: "123-456-7890",
      active: true,
      driver: true,
      acceptingRides: true,
      address: "123 liv+",
      latitude: 45,
      longitude: 45
    };
  });

  it('should create', () => {
    expect(preferenceComponent).toBeTruthy();
  });

  it("should route away from the page if the user isn't authorized", (done) => {
    mockUser.userId = 0;
    mockAuthService.user = mockUser;
    preferenceComponent.ngOnInit();
    done();

    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toEqual(['']);
  })

  it("should get user preference when running ngOnInit", (done) => {
    mockAuthService.user = mockUser;
    preferenceComponent.ngOnInit();
    mockUserService.getUserById(mockUser.userId).then( user => {
      expect(preferenceComponent.user).toEqual(mockUser);
      done();
    })
  })

  it("should toggle the user's active flag if true", () =>{
    preferenceComponent.user = mockUser;
    preferenceComponent.toggleActive();
    expect(preferenceComponent.user.active).toBeFalsy();
  })

  it("should toggle the user's active flag if false", () =>{
    preferenceComponent.user = mockUser;
    preferenceComponent.user.active = false;
    preferenceComponent.toggleActive();
    expect(preferenceComponent.user.active).toBeTruthy();
  })

  it("should toggle the user's accept rider flag", () =>{
    preferenceComponent.user = mockUser;
    preferenceComponent.user.acceptingRides = false;
    preferenceComponent.toggleAcceptRider();
    expect(preferenceComponent.user.active).toBeTruthy();
  })

});
