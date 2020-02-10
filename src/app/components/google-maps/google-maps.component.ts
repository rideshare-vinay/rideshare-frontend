import { Component, OnInit } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  private readonly longKey = 'longitude';
  private readonly latKey = 'latitude';
  public selectedAddress: PlaceResult;
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor() { }

  ngOnInit() {
    this.setCurrentLocation();
  }

  // Get current location coordinates.
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 20;
      });
    }
  }

  // Move the marker to where the user clicks.
  moveMarker(lat: number, long: number) {
    this.latitude = lat;
    this.longitude = long;
  }

  // Move the marker to the location set by the input bar.
  onLocationSelected(location: Location) {
    this.latitude = location[this.latKey];
    this.longitude = location[this.longKey];
  }

}
