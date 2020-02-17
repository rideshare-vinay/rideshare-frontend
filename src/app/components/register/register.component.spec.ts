import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DriverComponent } from '../driver/driver.component';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { of } from 'rxjs';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let userService: UserService;
  let batchService: BatchService;
  let router:Router;
  let mockUser : User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [RegisterComponent, DriverComponent], 
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: "home/drivers", component: DriverComponent}
      ])]
    });
    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    batchService = TestBed.get(BatchService);
    router = TestBed.get(Router);
    mockUser = {
      userId: 1,
      userName: 'kimuser',
      firstName: 'kim',
      lastName: 'jhonson',
      phoneNumber: '0123456789',
      email: 'email@email.com',
      driver: false,
      batch: { batchLocation: 'loc', batchNumber: 123 },
      acceptingRides: false,
      active: true,
      address: "address",
      latitude: 123,
      longitude: 456
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get all batches on ngOnInit", fakeAsync(() => {
    let mockBatches: Batch[] = [
      { batchNumber: 1, batchLocation: 'VWU - Morgantown, WV' },
      { batchNumber: 2, batchLocation: 'UTA - Arlington, TX' },
      { batchNumber: 3, batchLocation: 'USF - Tampa, FL' },
      { batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA' },
      { batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY' },
      { batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY' }
    ]
    spyOn(batchService, 'getAllBatches').and.returnValue(of(mockBatches));
    component.ngOnInit();
    expect(component.batches).toEqual(mockBatches);
  }));

  // it("should get all batches on onLocationSelected", () => {
  // });

  it('should call userService.createUser() when signingup a user', fakeAsync(() => {
    let spy = spyOn(userService, 'createUser');
    component.user=mockUser;
    component.signUp();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
