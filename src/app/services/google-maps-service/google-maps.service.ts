import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private googleMapsInputVisibility: boolean = true;
  private showMarker: boolean = true;
  private url: string;

  // prettier-ignore
  public googleMapsInputVisibilityEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.googleMapsInputVisibility);
  // prettier-ignore
  public showMarkerEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.showMarker);

  constructor(private http: HttpClient) {
    this.url = environment.rootUri;
  }

  // A setter method for changing the visibility of the google maps input bar.
  public setInputVisibility(visibility: boolean): void {
    this.googleMapsInputVisibility = visibility;
    this.googleMapsInputVisibilityEvent.next(this.googleMapsInputVisibility);
  }

  // A getter method for the visibility of the google maps input bar.
  public getInputVisibility(): boolean {
    return this.googleMapsInputVisibility;
  }

  // A setter method for choosing whether to show a marker or circle.
  public setShowMarker(show: boolean): void {
    this.showMarker = show;
    this.showMarkerEvent.next(this.showMarker);
  }

  // A getter method for whether a marker is shown.
  public getShowMarker(): boolean {
    return this.showMarker;
  }
}
