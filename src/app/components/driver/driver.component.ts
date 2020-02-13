import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';




@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  /**
   * Initializing userDriver as an User object and set riders array
   */

  userDriver : User ;
  myCar : Car = new Car();
  //riders: User[];
  location = '';   
   
  /**
   * Constructor 
   * @param carService A car service is injected.
   * @param userService An user service is instantiated.
   * @param router Provides an instance of a router.
   * @param authService An auth service is injected.
   */

  
  constructor(private carService: CarService, private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // let userId=1;
    let userId = this.authService.user.userId;
    if (userId) {
      this.userService.getDriverById(userId).
        subscribe(
          data => {
            this.userDriver = data;
            this.location = data.batch.batchLocation;
            this.getDriverCar(userId);
            // this.userService.getRidersForLocation(this.location)
            // .subscribe(
            //   data=> {
            //     this.riders = data;
            //   });
          })
        }
      else {
        this.router.navigate(['']);
      }
    }
    /**
   * A GET method that get driver car
   *
   */

    getDriverCar(userid){
      this.carService.getCarByUserId(userid).then((response)=>{
        if (response) {
          this.myCar = response;
        }
      })
    }
  /**
   * A PUT method that changes accepting ride status
   * @param userdriver 
   */

    changeAcceptingRides(userdriver){
       if(userdriver.acceptingRides == true){
        userdriver.acceptingRides = false;
      this.userService.changeDriverIsAccepting (this.userDriver);

    }
    else {
      userdriver.acceptingRides = true;
      this.userService.changeDriverIsAccepting(this.userDriver);

    }
  }

  /**
   * Logs out the user
   */


  logout() {
    this.router.navigate(['']);
  }
}
