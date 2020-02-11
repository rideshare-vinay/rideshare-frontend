import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   /**
    * This is the contructor for the validation service.
	*/
  constructor() { }
  
   /** 
  * this function validates the number of seats of the car.
  * @function
  * @returns {boolean}
  */
  validateSeats(seats: number): boolean {
    return seats > 0 && seats <= 6 && seats % 1 === 0;
  }
  
  /**
	 * This function is validates the length of the username
	 * @function
	 * @returns {boolean}
	 */
  validateUserName(userName: string): boolean {
		return userName.length >= 3 && userName.length <= 12;
	}

  /**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 * @function
	 * @returns {boolean}
	 */
	validateName(name: string): boolean {
		return /^([a-zA-Z]){1,20}$/.test(name) && name.length < 20;
	}

  /**
	 * This function checks the email that the user entered.
	 * @function
	 * @returns {boolean}
	 */
	validateEmail(email: string): boolean {
		return /^\w+\.?\w+@\w+\.\w{2,4}$/.test(email);
	}

  /**
	 * This function validates the phone number.
	 * @function
	 * @returns {boolean}
	 */
	validatePhone(phone: string): boolean {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }
  
  /**
	 * This function formats the name string.
	 * @function
	 * @returns {string}
	 */
	nameFormat(name: string): string {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
	}

  /**
	 * This function formats the phone number.
	 * @function
	 * @returns {string}
	 */
	phoneFormat(phone: string): string {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}
  
}
