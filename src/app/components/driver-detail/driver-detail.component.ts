import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {
  /**
   * Initializing userDriver as an User object and set riders array
   */

  userDriver : User ;
  myCar : Car = new Car();
  //riders: User[];
  location = '';
  userId: number; 
   
  /**
   * Constructor 
   * @param carService A car service is injected.
   * @param userService An user service is instantiated.
   * @param router Provides an instance of a router.
   * @param authService An auth service is injected.
   */
  constructor( private carService: CarService, private userService: UserService, private router: Router, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    
    this.userId = +this.activeRoute.snapshot.paramMap.get("id");

    if (this.userId) {
      this.userService.getDriverById(this.userId).
        subscribe(
          data => {
            this.userDriver = data;
            this.location = data.batch.batchLocation;
            this.getDriverCar(this.userId);
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
   * Logs out the user
   */


  logout() {
    this.router.navigate(['']);
  }

}
