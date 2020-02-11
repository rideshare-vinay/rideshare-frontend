import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarLookupService {
  private CarDB: string

  constructor(private http: HttpClient) {
    this.CarDB = "https://www.fueleconomy.gov/ws/rest/vehicle/menu"
  }

  //When given a year, returns a list of makes associated with that given year

  public lookupMakes(Year: number): Observable<String[]> {
    var obs = new Observable<String[]>((observer) => {
      this.http.get<MakeList>(this.CarDB + "/make?year=" + Year).subscribe(data => 
       observer.next(this.convertMakeArray(data)));
    });
    return obs;
  }


  //When given a year and make, returns a list of models associated with that year and make.
  public lookupModels(Year: number, make: String): Observable<String[]> {
    var obs = new Observable<String[]>((observer) => {
      this.http.get<MakeList>(this.CarDB + "/model?year=" + Year + "&make=" + make).subscribe(data => 
       observer.next(this.convertMakeArray(data)));
    });
    return obs;
  }

  private convertMakeArray(ListObj: MakeList): String[] {
    var arraylist = [];

    ListObj.menuItem.forEach(element => arraylist.push(element.value));
    console.log("List converted into Array: ")
    console.log(arraylist);

    return arraylist;
  }
}


class MakeList {
  /**
   * Set Car model
   */
  menuItem: MakeListItem[];


}
class MakeListItem {
  text: String;
  value: String;
}


