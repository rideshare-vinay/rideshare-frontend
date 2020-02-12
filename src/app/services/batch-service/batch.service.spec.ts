import { TestBed } from '@angular/core/testing';

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

describe('BatchService', () => {
  let batchService: BatchService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, CarRegisterComponent, RegisterComponent, LoginComponent,
        MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent,
        DriverInfoComponent, DriverComponent, AdminLoginComponent
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, HttpClientTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/my/app' }]
    })
    batchService = TestBed.get(BatchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(batchService).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify;
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

    // const batchResponse = [
    //   {
    //     batchNumber: 1,
    //     batchLocation: 'NYC'
    //   },
    //   {
    //     batchNumber: 2,
    //     batchLocation: 'VA'
    //   }
    // ];
    // let response;
    // spyOn(batchService, 'getAllBatches').and.returnValue(of(batchRespo.nse));

    // batchService.getAllBatches().subscribe(res => {
    //   response = res;
    // });

    // expect(response).toEqual(batchResponse);
  });

  it('Should return a list of batches based on location from an API via GET', () => {
    let mockBatches: Batch[] = [
      { batchNumber: 1, batchLocation: 'VWU - Morgantown, WV' },
      { batchNumber: 2, batchLocation: 'UTA - Arlington, TX' },
      { batchNumber: 3, batchLocation: 'USF - Tampa, FL' },
      { batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA' },
      { batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY' },
      { batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY' }
    ]
    batchService.getAllBatchesByLocation('UTA - Arlington, TX').subscribe(batches => {
      expect(batches.length).toBe(1);
      // expect(batches).toEqual({ batchNumber: 2, batchLocation: 'UTA - Arlington, TX' });
    })
    const request = httpMock.expectOne(batchService.url);
    expect(request.request.method).toBe("GET");
    request.flush(mockBatches);
  })

});



// describe('BatchService', () => {
//   let batchService: BatchService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//     declarations: [AdminComponent, CarRegisterComponent, RegisterComponent, LoginComponent, MyCarComponent, NavbarComponent, PreferenceComponent, ProfileComponent],
//     imports: [HttpClientModule, AppRoutingModule, FormsModule],
//     providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
//   })

//   batchService = TestBed.get(BatchService);
// })

// it('should register a batch', () => {
//   expect(batchService).toBeTruthy();
// });

//  //Adding test for getAllBatches() method
//  describe('getAllBatches', () => {

// });
// });