import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/user';
import { Router, Routes } from '@angular/router';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { MapDetailComponent } from 'src/app/components/map-detail/map-detail.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Admin } from 'src/app/models/admin';

describe('AuthService', () => {
  let authService:AuthService;
  let mockUser:User;
  let mockAdmin:Admin;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [RouterTestingModule.withRoutes([
        {path: "home/drivers", component: DriverComponent}, {path: "home/riders", component: MapDetailComponent}
      ])],
      declarations: [DriverComponent, MapDetailComponent]
    });
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    mockUser = new User();
    mockAdmin = new Admin();
  });


  it('should create', () => {
    expect(authService).toBeTruthy();
  });

  describe("login function", () => {
    it('should set user variable is user.userName matches chosenUserName', () => {
      const userName = "Peter_P";
      mockUser.userName = userName;
      authService.user = mockUser;
      authService.login(mockUser, userName);
      expect(authService.user).toEqual(mockUser);
    });
  
    it('should navigate to /home/drivers if the user is a driver', (done) => {
      let navigateSpy = spyOn(router, 'navigate');
  
      const userName = "Peter_P";
      mockUser.userName = userName;
      mockUser.driver = true;
      authService.login(mockUser, userName);
      done();
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home/drivers']);
    });
  
    it('should navigate to /home/riders is the user is a rider', (done) => {
      let navigateSpy = spyOn(router, 'navigate');
  
      const userName = "Peter_P";
      mockUser.userName = userName;
      mockUser.driver = false;
      authService.login(mockUser, userName);
      done();
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home/riders']);
    });
  
    it('should call fireIsLoggedIn emit function if the user.userName equals chosenUserName', (done) => {
      spyOn(authService.fireIsLoggedIn, 'emit');
      
      let userName = "Peter_P";
      mockUser.userName = userName;
      mockUser.driver = undefined; 
      authService.user = mockUser;
      authService.login(mockUser, userName);
      done();
  
      expect(authService.fireIsLoggedIn.emit).toHaveBeenCalled();
    });
  
    it('should return false when userName of user does not equal chosenUserName', () => {
      let userName1 = "Peter_P";
      let userName2 = "Bruce_B";
      mockUser.userName = userName1;
      authService.user = mockUser; 
      let results = authService.login(mockUser, userName2);
  
      expect(results).toBeFalsy();
    });
  });

  describe("loginAdAdmin function", () => {
    it('should set the admin if the admin user name matches the passed userName', () => {
      let userName = "Peter_P";
      mockAdmin.userName = userName;
      authService.loginAsAdmin(mockAdmin, userName);
      expect(authService.admin).toEqual(mockAdmin);
    });

    it('should route to /admin is the admin.userName matches the passde userName', fakeAsync(() => {
      const navigateSpy = spyOn(router, 'navigate');
      
      let userName = "Peter_P";
      mockAdmin.userName = userName;
      authService.loginAsAdmin(mockAdmin, userName);

      expect(navigateSpy).toHaveBeenCalledWith(['/admin']);
    }));

    it('should call fireIsLoggedInt.emit with the admin as an argument', fakeAsync(() => {
      spyOn(authService.fireIsLoggedIn, 'emit');
      spyOn(router, 'navigate');
      
      let userName = "Peter_P";
      mockAdmin.userName = userName;
      authService.loginAsAdmin(mockAdmin, userName);
      
      expect(authService.fireIsLoggedIn.emit).toHaveBeenCalledWith(mockAdmin);
    }))

    it('should return false if the admin.userName is not the passed userName', () => {
      let userName1 = "Peter_P";
      let userName2 = "Bruce_B";
      mockAdmin.userName = userName1;
      const result = authService.loginAsAdmin(mockAdmin, userName2);

      expect(result).toBeFalsy();
    })

    it("should return fireIsLoggedIn  emitter", () => {
      expect(authService.getEmitter()).toBeTruthy();
    })
  });

});
