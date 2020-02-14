import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coordinates } from 'src/app/models/coordinates';
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
   * A list of coordinates to be placed as markers on a map.
   */
  private googleMapsMarkerList: Coordinates[] = [];
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
  // prettier-ignore
  /**
   * An event to change the value of markerList in the google-maps.component.ts when emitted.
   */
  public googleMapsMarkerListEvent: BehaviorSubject<Coordinates[]> =
    new BehaviorSubject<Coordinates[]>(this.googleMapsMarkerList);

  /**
   * Sets the url to the location of the GoogleMapsController in the User Service backend.
   * @param http Injection of HttpClient for calls to the GoogleMapsController.
   */
  constructor(private http: HttpClient) {
    this.url = environment.recommendationUri;
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

  /**
   * A setter method for updating the markerList on the map.
   * @param markerList The list of coordinates to set.
   */
  public setCoordinatesList(markerList: Coordinates[]) {
    this.googleMapsMarkerList = markerList;
    this.googleMapsMarkerListEvent.next(this.googleMapsMarkerList);
  }

  /**
   * A getter method for getting the current markerList on the map.
   */
  public getCoordinatesList(): Coordinates[] {
    return this.googleMapsMarkerList;
  }

  /**
   * Method to get a number of Driver recommendations for the current user.
   * @param numberOfDrivers The number of drivers to ask for from the algorithm.
   * @param riderInformation The information of the current user to make recommendations too.
   */
  public getDriverRecommendations(
    numberOfDrivers: number,
    riderInformation: User
  ): Observable<User[]> {
    return this.http.post<User[]>(this.url + numberOfDrivers, riderInformation);
  }
}
