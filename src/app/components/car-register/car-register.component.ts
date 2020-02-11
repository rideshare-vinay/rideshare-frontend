import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CarLookupService } from 'src/app/services/car-lookup-service/car-lookup.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.css']
})
  /**
   * The Car Register component
   */

export class CarRegisterComponent implements OnInit {
 
  /**
   * Set years as an array of numbers
   * Set userId
   * Instantiates a car
   */

  years: number[] = [];
  makes: String[] = [];
  models: String[] = [];
  selectedYear: number;
  selectedMake: String;
  selectedModel: String;
  userId: number;
  car: Car = new Car();
  
  /**
   * This is constructor
   * @param carService A dependency of a car service is injected.
   * @param CarLookupService A dependency of a car model and make database is injected.
   * @param router Provides an instance of a router.
   */

  constructor(
    private carService: CarService, 
    private router: Router, 
    public validationService: ValidationService, 
    private lookupService: CarLookupService, 
    private authService: AuthService) { }

  /**
   * This is an OnInit function that sets the user id as the parsed string in session storage.
   * The system will check if the user id is valid.
   * Once validated, it will initialize the fields. 
   */
  ngOnInit() {
    this.userId = this.authService.user.userId;

    if (!this.userId) {
      console.log("You aren't supposed to be here!");
      //this.router.navigate(['']);
    }
      let currentYear = new Date().getFullYear();
      let availableYear = 1984; //Lowest
      for (let i = availableYear; i <= currentYear; i++) {
        this.years.push(i);
        this.car.year = this.years[0];
    }
    this.grayFields(2);
  }

 /**
  * @param event
  * @returns {void}
  */
  changeYear(event) {
		let option = event.target.options.selectedIndex;
		this.car.year = this.years[option];
  }
  
  /**
   * A POST method that adds a car object to the user
   */
  addCar() {
    if (this.validationService.validateSeats(this.car.seats)) {
      this.carService.createCar(this.car, this.userId);
    }
  }

 /**
   * Calls on the car lookup service to retrieve a list of makes given a year, and
   * pass that onto the make field.
   */
  updateMakeList(year:number){
    
    console.log(this.selectedYear);
    this.selectedYear=year;
    this.grayFields(2);
    this.lookupService.lookupMakes(year).subscribe(
      data=>{this.makes=data;console.log("Returned from server with: " + this.makes);
      this.grayFields(1);
    });
  }

   /**
   * Calls on the car lookup service to retrieve a list of makes given a year, and
   * pass that onto the make field.
   */
  updateModelList(make:String){
    this.grayFields(1);
    
    this.lookupService.lookupModels(this.selectedYear,make).subscribe(
      data=>{this.models=data;
      this.grayFields(0);
    });
  }

  /*grays and disables vehicle selector fields not yet fillable. Low priority*/
  grayFields(fields:number){
    // Gray out Make and Model
    if(fields == 2){
      
    }

    // Gray out Model only, enable Make
    if(fields == 1){

    }
  // Enable both make and model.
    if(fields == 0){

    }
    }
}
