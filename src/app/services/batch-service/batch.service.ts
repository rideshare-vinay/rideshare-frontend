import { Injectable } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/**
 * This is the batch service
 */
export class BatchService {

	url: string = environment.batchesUri;
	
	batches: Batch[] = [
		{batchNumber: 1, batchLocation: 'VWU - Morgantown, WV'},
		{batchNumber: 2, batchLocation: 'UTA - Arlington, TX'},
		{batchNumber: 3, batchLocation: 'USF - Tampa, FL'},
		{batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA'},
		{batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY'},
		{batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY'}
	];
	constructor(private http: HttpClient) { }

	/**
	 * This function fetches all the batches.
	 */
<<<<<<< HEAD
	getAllBatches() {
		return this.http.get<Batch[]>(this.url);
=======
	getAllBatchesMock() {
		return of(this.batches);
>>>>>>> 34ae9866696f1bf86834f482c1a77e5672f5f3d2
	}

	getAllBatches(): Observable<Batch[]> {
		console.log("getting batches");
		return this.http.get<Batch[]>(this.url);
	}

	getAllBatchesByLocation(location: string): Observable<Batch[]> {
		return this.http.get<Batch[]>(`${this.url}?location=${location}`);
	}
}
