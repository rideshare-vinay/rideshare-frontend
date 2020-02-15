import { Injectable } from '@angular/core';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   /**
    * This is the contructor for the validation service.
	*/
  constructor() { }
  

	/** 
  * this function validates the validity of a car.
  * @function
  * @returns {boolean}
  */
 validateCar(car: Car) {
    return this.validateColor(car.color)&&this.validateSeats(car.seats)&&this.validateYear(car.year)&&this.validateMake(car.make)&&this.validateModel(car.model)
  }
   /** 
  * this function validates the number of seats of the car.
  * @function
  * @returns {boolean}
  */
  validateSeats(seats: number) {
    return seats > 0 && seats <= 6 && seats % 1 === 0;
  }

	/** 
  * this function validates the color of the car.
  * @function
  * @returns {boolean}
  */
 validateColor(color: String) {
	if(color!=null){
		return true;
	}
	else{
		return false;
	}
  }

  	/** 
  * this function validates the color of the car.
  * @function
  * @returns {boolean}
  */
 validateYear(year: number) {
	if(year!=null){
		return true;
	}
	else{
		return false;
	}
  }

  	/** 
  * this function validates the color of the car.
  * @function
  * @returns {boolean}
  */
 validateMake(make: string) {
	if(make!=null && make!=""){
		return true;
	}
	else{
		return false;
	}
  }

  	/** 
  * this function validates the model of the car.
  * @function
  * @returns {boolean}
  */
 validateModel(model: string) {
	if(model!=null && model!=""){
		return true;
	}
	else{
		return false;
	}
  }
  
  /**
	 * This function is validates the length of the username
	 */
  validateUserName(userName: string) {
		return userName.length >= 3 && userName.length <= 12;
	}

  /**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 */
	validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name) && name.length < 20;
	}

  /**
	 * This function checks the email that the user entered.
	 */
	validateEmail(email: string) {
		return /^\w+\.?\w+@\w+\.\w{2,4}$/.test(email);
	}

  /**
	 * This function validates the phone number.
	 */
	validatePhone(phone: string) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }
  
  /**
	 * This function formats the name string.
	 */
	nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}

  /**
	 * This function formats the phone number.
	 */
	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}
  
}
