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
import { APP_BASE_HREF } from '@angular/common';
import { DriverComponent } from '../driver/driver.component';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Router } from '@angular/router';

fdescribe('PreferenceComponent', () => {
  let preferenceComponent: PreferenceComponent;
  let preferenceFixture: ComponentFixture<PreferenceComponent>;
  let routerSpy = jasmine.createSpyObj("Router", ['navigate'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ PreferenceComponent, AdminComponent, 
        CarRegisterComponent, RegisterComponent, 
        LoginComponent, MyCarComponent, 
        NavbarComponent, ProfileComponent,
        DriverComponent, MapDetailComponent,
        DriverInfoComponent, AdminLoginComponent ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    preferenceFixture = TestBed.createComponent(PreferenceComponent);
    preferenceComponent = preferenceFixture.componentInstance;
    preferenceFixture.detectChanges();
  });

  it('should create', () => {
    expect(preferenceComponent).toBeTruthy();
  });
});
