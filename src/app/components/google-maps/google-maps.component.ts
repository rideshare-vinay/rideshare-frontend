import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  private readonly longKey = 'longitude';
  private readonly latKey = 'latitude';
  public selectedAddress: PlaceResult;
  public inputVisibility: boolean;
  public polyline: google.maps.Polyline;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public destination: any;
  public origin: any;
  public lines: any;

  constructor(
    private googleMapsService: GoogleMapsService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit() {
    this.googleMapsService.googleMapsInputVisibilityEvent.subscribe(
      visibility => {
        this.inputVisibility = visibility;
      }
    );

    this.setCurrentLocation();

    this.origin = {
      lat: 24.799448,
      lng: 120.979021
    };

    this.destination = {
      lat: 24.799524,
      lng: 120.975017
    };
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // Move the marker to the location the user clicked on.
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
