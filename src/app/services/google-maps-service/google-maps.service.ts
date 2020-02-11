import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private url: string;
  private googleMapsInputVisibility: boolean = true;
  public googleMapsInputVisibilityEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.googleMapsInputVisibility);

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:9000/';
  }

  public getPoints(origin: string, destination: string): Observable<any> {
    // console.log( origin )
    // return this.http.post <any>( 'http://localhost:4200/directions/' + origin + '/' + destination );
    console.log(origin, destination);
    return this.http.get<any>(this.url + 'points/' + origin + '/' + destination);
  }

  public decodePolyline() {
  }

  // A setter method for changing the visibility of the google maps input bar.
  public setInputVisibility(visibility: boolean): void {
    this.googleMapsInputVisibility = visibility;
    this.googleMapsInputVisibilityEvent.
      next(this.googleMapsInputVisibility);
  }

  // A getter method for the visibility of the google maps input bar.
  public getInputVisibility(): boolean {
    return this.googleMapsInputVisibility;
  }

}
