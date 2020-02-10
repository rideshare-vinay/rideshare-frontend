import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';
import { MapsAPILoader } from '@agm/core';


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
  lines : any;
  polyline : google.maps.Polyline;
  origin : any;
  destination : any;



  constructor( private googleMapsService : GoogleMapsService, private mapsAPILoader: MapsAPILoader ) { 

  }

  ngOnInit() : any {  
    this.setCurrentLocation();
    // this.getPoints();
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
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // Do this
  moveMarker( lat : number, long : number ) {
    this.latitude = lat;
    this.longitude = long;
  }

}
