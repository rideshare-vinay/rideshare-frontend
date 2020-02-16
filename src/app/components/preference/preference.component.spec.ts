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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';

fdescribe('PreferenceComponent', () => {
  let preferenceComponent: PreferenceComponent;
  let preferenceFixture: ComponentFixture<PreferenceComponent>;
  let mockAuthService: AuthService;
  let mockUser: User;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate'])

  class MockAuthService {
    user: User;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PreferenceComponent, AdminComponent,
        CarRegisterComponent, RegisterComponent,
        LoginComponent, MyCarComponent,
        NavbarComponent, ProfileComponent,
        DriverComponent, MapDetailComponent,
        DriverInfoComponent, AdminLoginComponent,
        GoogleMapsComponent],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
      .compileComponents();
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
  }));

  beforeEach(() => {
    preferenceFixture = TestBed.createComponent(PreferenceComponent);
    preferenceComponent = preferenceFixture.componentInstance;
    preferenceFixture.detectChanges();
  });

  it('should create', () => {
    expect(preferenceComponent).toBeTruthy();
  });

  xit("should route away from the page if the user isn't authorized", (done) => {
    mockUser.userId = null;
    mockAuthService.user = mockUser;
    preferenceComponent.ngOnInit();
    done();

    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toEqual(['']);
  })

});
