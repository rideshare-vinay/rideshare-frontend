import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { Batch } from 'src/app/models/batch';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

/**
 * This is the Register Component
 */

export class RegisterComponent implements OnInit {

/**
 * An array of batches 
 */
	batches: Batch[] = [];
	validAddress: boolean = false;
	batch: Batch = new Batch()
	user: User = new User();
	batchNumber: number;
	location: string ="";
	role: string ="";
	private readonly latKey = 'latitude';
	private readonly longKey = 'longitude';

  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param batchService A dependency of a batch service is injected.
   */

	constructor(private userService: UserService, private batchService: BatchService, public validationService: ValidationService) { }


  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid; once validated a batch service is called.
   */
	ngOnInit() { 
		this.batchService.getAllBatches().subscribe(data=>this.batches=data);
	}


	/**
	 * This function allows the user to select the batch location.
	 * @param event
	 */
	changeLocation(event) {
		// let location = event.target.value;
		this.user.batch.batchLocation = this.location;
		this.batchService.getAllBatchesByLocation(this.location).subscribe(data => {
			this.batches = data;
		});
	}

	changeBatchNumber(event) {
		this.user.batch.batchNumber = event.target.value;
	}

	onLocationSelected(location: Location) {
		this.user.address = (<HTMLInputElement>document.getElementById('address')).value;
		this.user.latitude = location[this.latKey];
		this.user.longitude = location[this.longKey];
		this.validAddress = true;
	}

	/**
	 * This function creates a driver if all the validations are true.
	 * @param role
	 */

	signUp() {
		if (this.validationService.validateUserName(this.user.userName) && this.validationService.validateName(this.user.firstName) && this.validationService.validateName(this.user.lastName) && this.validationService.validateEmail(this.user.email) && this.validationService.validatePhone(this.user.phoneNumber)) {
			this.user.firstName = this.validationService.nameFormat(this.user.firstName);
			this.user.lastName = this.validationService.nameFormat(this.user.lastName);
			this.user.phoneNumber = this.validationService.phoneFormat(this.user.phoneNumber);
			this.batch.batchNumber= this.batchNumber;
			this.batch.batchLocation= this.location;
			this.user.batch = this.batch;
			this.userService.createUser(this.user, this.role);
		}
	}

}
