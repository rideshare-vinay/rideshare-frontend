import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  /**
   * A boolean determining the visibility of the google maps input bar.
   */
  private googleMapsInputVisibility: boolean = false;
  /**
   * A string url for HttpClient requests.
   */
  private url: string;

  // prettier-ignore
  /**
   * An event to change the value of inputVisibility in the google-maps.component.ts when emitted.
   */
  public googleMapsInputVisibilityEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.googleMapsInputVisibility);

  /**
   * Sets the url to the location of the GoogleMapsController in the User Service backend.
   * @param http Injection of HttpClient for calls to the GoogleMapsController.
   */
  constructor(private http: HttpClient) {
    this.url = environment.rootUri;
  }

  /**
   * A setter method for changing the visibility of the google maps input bar.
   * @param visibility True makes the input bar visible, false makes it invisible.
   */
  public setInputVisibility(visibility: boolean): void {
    this.googleMapsInputVisibility = visibility;
    this.googleMapsInputVisibilityEvent.next(this.googleMapsInputVisibility);
  }

  /**
   * A getter method for the visibility of the google maps input bar.
   */
  public getInputVisibility(): boolean {
    return this.googleMapsInputVisibility;
  }

  public setCoordinatesList() {

  }

  public getCoordinatesList() {
    
  }

  /**
   * Undocumented
   */
  public getDriverRecommendations(numberOfDrivers: number, riderInformation: User): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:9000/recommendations/' + numberOfDrivers, riderInformation);
  }
}
