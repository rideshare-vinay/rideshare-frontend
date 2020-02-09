import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  title: string = 'Rideforce Map';
  latitude: number;
  longitude: number;
  zoom: number;

  constructor( private googleMapsService : GoogleMapsService ) { 

  }

  ngOnInit() {
    // this.setCurrentLocation();
    this.getDirections();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  private getDirections() {
    this.googleMapsService.getDirections( 'disneyland', 'universal_studios' );
  }

}
