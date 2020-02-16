import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DriverInfoComponent } from './driver-info.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { DriverComponent } from '../driver/driver.component';
import { MapDetailComponent } from '../map-detail/map-detail.component';
import { LoginComponent } from '../login/login.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminComponent } from '../admin/admin.component';
import { RegisterComponent } from '../register/register.component';
import { CarRegisterComponent } from '../car-register/car-register.component';

fdescribe('DriverInfoComponent', () => {
  let component: DriverInfoComponent;
  let fixture: ComponentFixture<DriverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverInfoComponent,
        DriverComponent,
        MapDetailComponent,
        LoginComponent,
        AdminLoginComponent,
        AdminComponent,
        RegisterComponent,
        CarRegisterComponent
      ],
      imports: [HttpClientModule, AppRoutingModule,
        FormsModule, RouterTestingModule,
        RouterModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
