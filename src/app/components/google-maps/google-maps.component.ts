import { Component, OnInit } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';

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
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.googleMapsService.googleMapsInputVisibilityEvent.subscribe((visibility) => {
      this.inputVisibility = visibility;
    });

    this.setCurrentLocation();
    this.getPoints();
  }

  // Get current location coordinates.
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  private getPoints() {
    this.googleMapsService.getPoints('disneyland', 'universal+studios+hollywood').subscribe(res => {
      console.log(res);
    });
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
