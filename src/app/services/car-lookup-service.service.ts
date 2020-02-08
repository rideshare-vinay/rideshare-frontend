import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private CarDB:string

  constructor(private http:HttpClient) {
    this.CarDB="https://www.fueleconomy.gov/ws/rest/vehicle/menu/"
  
  }

  //When given a year, returns a list of makes associated with that given year

  public lookupMakes(Year: number): Observable<String[]> {

    var value = this.http.get<String[]>(this.CarDB + "/make?year=" + Year);
    return value;
  }


  //When given a year and make, returns a list of models associated with that year and make.
  public lookupModels(Year: number, make: string): Observable<String[]>{

    var value = this.http.get<String[]>(this.CarDB + "/model?year=" + Year + "&make=" + make);
    return value;
  } 
}
