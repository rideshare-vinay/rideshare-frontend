import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, DriverInfoComponent, DriverComponent, LoginComponent, 
        AdminLoginComponent, RegisterComponent, CarRegisterComponent, MyCarComponent,
        ProfileComponent, PreferenceComponent ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return user info', () => {
    let mockUser: User = {userId:1, userName: "testing", batch: new Batch(), 
    firstName:"jon", lastName:"smith", email:"test", phoneNumber:"also a test",
    active: true, driver: true, acceptingRides: true}
    let spy: any;
    spy = spyOn(component,'getUserInfo');

    component.getUserInfo();
    expect(spy).toHaveBeenCalled();
   })

   it('should compare user info', () => {
    let mockUser: User = {userId:1, userName: "testing", batch: new Batch(), 
    firstName:"jon", lastName:"smith", email:"test", phoneNumber:"also a test",
    active: true, driver: true, acceptingRides: true}
    let spy: any;
    spy = spyOn(component, 'compareUser');

    component.compareUser();
    expect(spy).toHaveBeenCalled();
   })
   
});
