import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarLookupService {
  url="https://www.fueleconomy.gov/ws/rest/vehicle/menu/"
  constructor(private http: HttpClient) {}

  getYears(){
		return this.http.get(this.url+"year",{responseType: 'text'});
	}

	getMakes(year:string){
		return this.http.get(this.url+"make?year="+year,{responseType: 'text'});
  }

  getModels(year:string,make:string){
		return this.http.get(this.url+"model?year="+year+"&make="+make,{responseType: 'text'});
	}
}
