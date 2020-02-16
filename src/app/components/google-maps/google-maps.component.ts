import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';
import { Coordinates } from 'src/app/models/coordinates';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  /**
   * Path to a custom png for driver markers.
   */
  public driverMarkerPath = 'assets/driverIcon.png';
  /**
   * Path to a custom png for rider markers.
   */
  public riderMarkerPath = 'assets/riderIcon.png';
  /**
   * A list of markers that will be displayed on the map.
   */
  public markerList: Coordinates[];
  /**
   * A boolean to show or hide an input bar
   */
  public inputVisibility: boolean;
  /**
   * The user's current longitude.
   */
  public longitude: number;
  /**
   * The user's current latitude.
   */
  public latitude: number;

  /**
   * Injects the necessary services for the GoogleMapsComponent.
   * @param googleMapsService A service that manipulates the variables in this component.
   */
  constructor(private googleMapsService: GoogleMapsService) {}

  /**
   * Subscribes to events in the googleMapsService.
   * Event to change the input bar visibility.
   * Event to show markers or circles on the map.
   * Sets the map location using setCurrentLocation.
   */
  ngOnInit() {
    this.googleMapsService.googleMapsMarkerListEvent.subscribe(markerList => {
      this.markerList = markerList;
    });

    this.googleMapsService.googleMapsInputVisibilityEvent.subscribe(
      visibility => {
        this.inputVisibility = visibility;
      }
    );

    this.setCurrentLocation();
  }

  /**
   * Set the rider's location to their current position.
   */
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
