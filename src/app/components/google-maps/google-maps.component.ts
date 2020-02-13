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
   * A list of markers that will be displayed on the map.
   */
  public markerList: Coordinates[];
  /**
   * A boolean to show or hide an input bar
   */
  public inputVisibility: boolean;
  public longitude: number;
  public latitude: number;
  public zoom: number;

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

    if (this.markerList === []) {
      this.setCurrentLocation();
    }
  }

  /**
   * Set the location and zoom level of the map to a rider's position.
   */
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  /**
   * Moves the marker to the location set in the input bar.
   * @param location contains the latitude and longitude of the selected location.
   */
  onLocationSelected(location: Location) {
  }
}
