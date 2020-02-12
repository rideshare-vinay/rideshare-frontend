import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LogService } from 'src/app/services/log.service';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   * Instantiates user, newUser, batches, oldBatchNumber and oldBatchLocation
   */

  user: User = new User();
  myCar : Car = new Car();
  newUser: User = new User();
  batch: Batch = new Batch();
  batches: Batch[] = [];
  oldBatchNumber: number;
  oldBatchLocation: string;

  /**
   * Set fields property
   */

  editable: string = '';
  noChange: boolean = false;
  updateSuccess: boolean = false;
  updateFailed: boolean = false;
  ownCar: boolean;
  truthy: string = 'btn btn-success';
  falsy: string = 'btn btn-danger';

  /**
   * Constructor
   * @param log A log service
   * @param router Provides an instance of a router.
   * @param userService An user service is instantiated.
   * @param batchService A batch service is instantiated
   * @param validationService A validation service is instantiated
   * @param authService An authorization service is instantiated
   */
  constructor(private log: LogService, private router: Router, private userService: UserService, private batchService: BatchService, public validationService: ValidationService, private authService: AuthService,private carService: CarService) { }

  ngOnInit() {
    this.user.userId = this.authService.user.userId;;
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getUserInfo();
      this.getDriverCar(this.user.userId);
    }
  }

  /**
   * A GET method that retrieves user's information
   */

  getUserInfo() {
    this.user.batch = this.batch;
      this.userService.getUserById(this.user.userId).then(response => {
        if (response) {
          this.user = response;
          this.oldBatchNumber = this.user.batch.batchNumber;
          this.oldBatchLocation = this.user.batch.batchLocation;
          this.newUser = Object.assign({}, this.user);

          this.batches = this.batchService.getAllBatches();
          this.batches = this.batches.filter(batch => batch.batchNumber === this.user.batch.batchNumber).concat(this.batches.filter(batch => batch.batchNumber !== this.user.batch.batchNumber))
        } else {
          this.authService.user = {};
          this.router.navigate(['']);
        }
      })
  }
  
   /**
   * A GET method that get driver car 
   *
   */

  getDriverCar(userid){
    this.carService.getCarByUserId(userid).then((response)=>{
      if (response) {
        this.myCar = response;
        this.ownCar = true;
      }else {
        this.ownCar = false;
      }
    })
  }
  /**
   * A method that compares two users
   */

  compareUser() {
    return this.user.firstName.toLowerCase() === this.newUser.firstName.toLowerCase() && this.user.lastName.toLowerCase() === this.newUser.lastName.toLowerCase() && this.user.userName === this.newUser.userName && this.user.email === this.newUser.email && this.validationService.phoneFormat(this.user.phoneNumber) === this.validationService.phoneFormat(this.newUser.phoneNumber) && this.user.batch.batchNumber === this.oldBatchNumber;
  }

  /**
   * A function that changes the batch location
   * @param event 
   */

  changeLocation(event) {
		let option = event.target.options.selectedIndex;
    this.newUser.batch.batchNumber = this.batches[option].batchNumber;
    this.newUser.batch.batchLocation = this.batches[option].batchLocation;
	}

  /**
   * A function that update the profile
   */
  
  updateProfile() {
    if (this.validationService.validateUserName(this.newUser.userName) && this.validationService.validateName(this.newUser.firstName) && this.validationService.validateName(this.newUser.lastName) && this.validationService.validateEmail(this.newUser.email) && this.validationService.validatePhone(this.newUser.phoneNumber)) {
      this.editable = '';
      if (this.compareUser()) {
        this.noChange = true;
        this.newUser = Object.assign({}, this.user);
        setTimeout(() => this.noChange = false, 3000);
      } else {
        this.newUser.firstName = this.validationService.nameFormat(this.newUser.firstName);
        this.newUser.lastName = this.validationService.nameFormat(this.newUser.lastName);
        this.newUser.phoneNumber = this.validationService.phoneFormat(this.newUser.phoneNumber);
        this.newUser.batch.batchLocation = this.user.batch.batchLocation;
        this.newUser.batch.batchNumber = this.user.batch.batchNumber;

        this.userService.updateUserInfo(this.newUser).then(response => {
          this.authService.user = response;
          this.log.info("updated user info: " + '\n' + JSON.stringify(response));          
          this.getUserInfo();
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 5000);
        }, error => {
          this.log.error(error);
          this.updateFailed = true;
          setTimeout(() => this.updateFailed = false, 5000);
        })
      }
    }
  }

  /**
   * A method that allow edits on the attribute
   * @param attribute 
   */

  edit(attribute) {
    if (this.editable === attribute) {
      this.editable = '';
    } else {
      this.editable = attribute;
    }
  }

  /**
   * A function that restore changes to the batch object.
   */
  restoreChange() {
    this.editable = '';
    this.newUser = Object.assign({}, this.user);
    this.newUser.batch.batchNumber = this.oldBatchNumber;
    this.newUser.batch.batchLocation = this.oldBatchLocation;
  }

  /**
   * @function
   * this function changes the account from activate to inactive
   */

  toggleActive() {
    if (this.user.active) {
      this.user.active = !this.user.active;
      this.user.acceptingRides = false;
      this.userService.updatePreference('active', this.user.active, this.user.userId);
    } else {
      this.user.active = !this.user.active;
      this.userService.updatePreference('active', this.user.active, this.user.userId);
    }
    
  }

    /**
   * @function
   * this function changes the mode of driver and rider
   */

  toggleDriver() {
    this.user.driver = !this.user.driver;
    this.userService.updatePreference('driver', this.user.driver, this.user.userId);
    
  }

 /**
   * @function
   * this function changes the driver account from accepting rides to not accepting rides.
   */

  toggleAcceptRider() {
    this.user.acceptingRides = !this.user.acceptingRides;
    this.userService.updatePreference('acceptingRides', this.user.acceptingRides, this.user.userId);
  }
}
