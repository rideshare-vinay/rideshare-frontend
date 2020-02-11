import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  /**
   *
   */
  private googleMapsInputVisibility: boolean = true;
  private showMarkerOrCircle: boolean = true;
  private url: string;

  // prettier-ignore
  public googleMapsInputVisibilityEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.googleMapsInputVisibility);
  // prettier-ignore
  public showMarkerOrCircleEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.showMarkerOrCircle);

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

  /**
   * A setter method for choosing whether to show a marker or circle.
   * @param show True makes the marker visible, false makes the circle visible.
   */
  public setShowMarkerOrCircle(show: boolean): void {
    this.showMarkerOrCircle = show;
    this.showMarkerOrCircleEvent.next(this.showMarkerOrCircle);
  }

  /**
   * A getter method for whether a marker or circle is shown.
   * true == marker and false == circle
   */
  public getShowMarkerOrCircle(): boolean {
    return this.showMarkerOrCircle;
  }
}
