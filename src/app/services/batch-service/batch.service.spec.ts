import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { BatchService } from './batch.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';

import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { Batch } from 'src/app/models/batch';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DriverInfoComponent } from 'src/app/components/driver-info/driver-info.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component';
import { MapDetailComponent } from 'src/app/components/map-detail/map-detail.component';

describe('BatchService', () => {
  let batchService: BatchService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    batchService = TestBed.get(BatchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(batchService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should return a list of batches from the API via GET', () => {
    let mockBatches: Batch[] = [
      { batchNumber: 1, batchLocation: 'VWU - Morgantown, WV' },
      { batchNumber: 2, batchLocation: 'UTA - Arlington, TX' },
      { batchNumber: 3, batchLocation: 'USF - Tampa, FL' },
      { batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA' },
      { batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY' },
      { batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY' }
    ]
    batchService.getAllBatches().subscribe(batches => {
      expect(batches.length).toBe(6);
      expect(batches).toEqual(mockBatches);
    })

    const request = httpMock.expectOne(batchService.url);
    expect(request.request.method).toBe("GET");
    request.flush(mockBatches);
  });

  it('Should return a list of batches based on location from an API via GET', () => {
    let mockBatches: Batch[] = [
      { batchNumber: 1, batchLocation: 'VWU - Morgantown, WV' },
      { batchNumber: 2, batchLocation: 'UTA - Arlington, TX' },
      { batchNumber: 3, batchLocation: 'UTA - Arlington, TX' },
      { batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA' },
      { batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY' },
      { batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY' }
    ]
    let batchLocation = "UTA - Arlington, TX"
    batchService.getAllBatchesByLocation('UTA - Arlington, TX').subscribe(batches => {
      expect(batches).toEqual(mockBatches);
    })
    const request = httpMock.expectOne(batchService.url + "?location=" + batchLocation);
    expect(request.request.method).toBe("GET");
    request.flush(mockBatches);
  })

});