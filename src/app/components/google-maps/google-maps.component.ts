import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  private readonly latKey = 'latitude';
  private readonly longKey = 'longitude';
  public polyline: google.maps.Polyline;
  public selectedAddress: PlaceResult;
  public color: string = '#EA4335';
  public inputVisibility: boolean;
  public longitude: number;
  public latitude: number;
  public destination: any;
  public marker: boolean;
  public zoom: number;
  public origin: any;
  public lines: any;

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
    this.googleMapsService.googleMapsInputVisibilityEvent.subscribe(
      visibility => {
        this.inputVisibility = visibility;
      }
    );

    this.googleMapsService.showMarkerOrCircleEvent.subscribe(marker => {
      this.marker = marker;
    });

    this.setCurrentLocation();
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
   * Move the marker to the location the user clicked on.
   * @param lat the value to set the marker's latitude too.
   * @param long the value to set the marker's longitude too.
   */
  moveMarker(lat: number, long: number) {
    this.latitude = lat;
    this.longitude = long;
  }

  /**
   * Moves the marker to the location set in the input bar.
   * @param location contains the latitude and longitude of the selected location.
   */
  onLocationSelected(location: Location) {
    this.latitude = location[this.latKey];
    this.longitude = location[this.longKey];
  }
}
