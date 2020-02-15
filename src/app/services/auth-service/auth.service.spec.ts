import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/user';
import { Router, Routes } from '@angular/router';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { MapDetailComponent } from 'src/app/components/map-detail/map-detail.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { MatPaginatedTabHeader } from '@angular/material/tabs/typings/paginated-tab-header';

describe('AuthService', () => {
  let authService:AuthService;
  let mockUser:User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [],
    });
    authService = TestBed.get(AuthService);
    mockUser = new User();
  });

  it('should create', () => {
    expect(authService).toBeTruthy();
  });

});
