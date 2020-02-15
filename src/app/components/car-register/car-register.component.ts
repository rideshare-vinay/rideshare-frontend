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
  colors : string[] = ["Black", "Grey", "White", "Silver", "Blue", "Green", "Red", "Gold", "Orange", "Pink", "Purple","Yellow"];
  years: string[] = [];
  makes: string[] = [];
  models: string[] = [];
  userId: number;
  car: Car = new Car();
  attemptedSubmission = false;
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
        this.years=this.xmlParser(data);
      })
      
  }

 /**
  * Changes year for the styled dropdown widget
  * @param year
  * @returns {void}
  */
 changeYear() {
  this.car.make="";
  this.car.model="";
  this.makes=[];
  this.models=[];
  this.carLookupService.getMakes(""+this.car.year).subscribe(data =>{
    this.makes=this.xmlParser(data);
  })
}
  /**
  * Changes make for the options
  * @param event
  * @returns {void}
  */
  changeMake() {
    this.car.model="";
    this.models=[];
    this.carLookupService.getModels(""+this.car.year,this.car.make).subscribe(data =>{     
      this.models=this.xmlParser(data);
      this.models=this.modelFilter(this.models)
      this.car.model=this.models[0];
    })
  }
  /**
   * A POST method that adds a car object to the user
   */
  addCar() {
    this.attemptedSubmission=true;
    if (this.validationService.validateCar(this.car)) {
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
    var values = text.split("\"value\":\"")
    values.reduce((prev,next,idx,arr) =>{
      output.push(next.split("\"")[0])
      return ""
    })
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
        if(previousmodel!="" && (["Lexus","Tesla"].lastIndexOf(this.car.make))==-1 && model.split(" ")[0]==previousmodel.split(" ")[0]){
          //presumed duplicate needs to be removed
          models.splice(i,1)
        }
        else{
          //new model, need to clean up bogus keywords
          model=model.split(/ \wWD/)[0]; //clean up wheel drive nonsense
          model=model.split(/ \w-Door/)[0]; //clean up door nonsense
          if(this.car.make == "Tesla" || this.car.make=="Lexus"){model=model.split(" ")[0]+" "+model.split(" ")[1]}//tesla/lexus nonsense
          if(model==previousmodel){
            models.splice(i,1)
          }
          else{
            models[i]=model
            previousmodel=model;
            i+=1
          }
        }
      }
      return models;
   }
}
