import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';
import { Admin } from 'src/app/models/admin';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let authService: AuthService;
  let userService: UserService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let mockUser : User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    mockUser = {
      userId: 1,
      userName: 'user2',
      firstName: 'kim',
      lastName: 'jhonson',
      phoneNumber: '0123456789',
      email: 'email@email.com',
      driver: false,
      batch: { batchLocation: '123abc', batchNumber: 123 },
      acceptingRides: false,
      active: true
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should properly assign name value when duringngOnInit function', () => {
    spyOn(userService, 'getUserById').and.returnValue(Promise.resolve(mockUser));
    authService.user = mockUser;
    component.ngOnInit();
    expect(component.name).toMatch(mockUser.firstName);
  });
});
