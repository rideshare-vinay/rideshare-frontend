import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CarLookupService } from 'src/app/services/car-lookup/car-lookup.service';

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
  allYears: string[] = [];
  years: string[] = [];
  allMakes: string[] = [];
  makes: string[] = [];
  allModels: string[] = [];
  models: string[] = [];
  userId: number;
  car: Car = new Car();
  
  curPage: number=1;
  totalPage: number=1;
  showDropDown: boolean = false;
  
  /**
   * This is constructor
   * @param carService A dependency of a car service is injected.
   * @param router Provides an instance of a router.
   */

  constructor(private carService: CarService, private router: Router, private carLookupService:CarLookupService, public validationService: ValidationService, private authService: AuthService) { }

  /**
   * This is an OnInit function that sets the user id as the parsed string in session storage.
   * The system will check if the user id is valid.
   * Once validated, it will initialize the fields. 
   */
  ngOnInit() {
    this.userId = this.authService.user.userId;
    if (!this.userId) {
      //this.router.navigate(['']);
    }
      this.carLookupService.getYears().subscribe(data =>{
        this.allYears=this.xmlParser(data);
        console.log(this.allYears)
        this.years = this.allYears;
      })
      
  }

 /**
  * Changes year for the styled dropdown widget
  * @param year
  * @returns {void}
  */
 newChangeYear(year:number) {
  this.showDropDown = false;
  this.curPage = 1;
  this.years = this.allYears.slice(this.curPage * 5 - 5, this.curPage * 5);
  this.car.year = year;
  this.car.make="";
  this.car.model="";
  this.makes=[];
  this.models=[];
  this.carLookupService.getMakes(""+year).subscribe(data =>{
    this.makes=this.xmlParser(data);
    this.car.make=this.makes[0];
  })
}

	/**
	 * Set next page
	 */
	nextPage() {
		this.curPage++;
		this.years = this.allYears.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	/**
	 * Set prev page
	 */

	prevPage() {
		this.curPage--;
		this.years = this.allYears.slice(this.curPage * 5 - 5, this.curPage * 5);
  }
  
  /**
	 * Toggles drop-down
	 */

  toggleDropDown() {
		this.showDropDown = !this.showDropDown;
  }
  /**
  * Changes make for the options
  * @param event
  * @returns {void}
  */
  changeMake(event) {
		let option = event.target.options.selectedIndex;
    this.car.make = this.makes[option];
    this.car.model="";
    this.models=[];
    this.carLookupService.getModels(""+this.car.year,this.car.make).subscribe(data =>{     
      this.models=this.xmlParser(data);
      this.models=this.modelFilter(this.models)
      this.car.model=this.models[0];
    })
  }
  /**
  * Changes model for the options
  * @param event
  * @returns {void}
  */
  changeModel(event) {
		let option = event.target.options.selectedIndex;
		this.car.model = this.models[option];
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
    *     function that parses through fueleconomy.gov xmls and returns an array of strings
    *     @param text - raw XML data from fueleconomy.gov api
    *     @returns {string[]} - parsed values
    */
  xmlParser(text:String):string[]{
    var output:string[];
    output = [];
    console.log(text)
    var values = text.split("\"value\":\"")
    values.reduce((prev,next,idx,arr) =>{
      output.push(next.split("\"")[0])
      return ""
    })
    console.log(output)
    return output;
  }
    /**
    *     function that parses through an arry of models and gets rid of duplicates the best it can
    *     @param text - raw XML data from fueleconomy.gov api
    *     @returns {string[]} - parsed values
    */
   modelFilter(models:string[]):string[]{
      var i = 0;
      var previousmodel="";
      var model:string;
      while(i<models.length){
        model=models[i];
        if(previousmodel!="" && model.split(" ")[0]==previousmodel.split(" ")[0]){
          //presumed duplicate needs to be removed
          models.splice(i,1)
        }
        else{
          //new model, need to clean up bogus keywords
          model=model.split(/ \wWD/)[0]; //clean up wheel driver nonsense
          models[i]=model
          previousmodel=model;
          i+=1
        }
      }
      return models;
   }
}
