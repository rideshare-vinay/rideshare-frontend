import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
