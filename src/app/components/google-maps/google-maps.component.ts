import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps-service/google-maps.service';
import { MapsAPILoader } from '@agm/core';
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

        this.googleMapsService.showMarkerEvent.subscribe(marker => {
            this.marker = marker;
        });

        this.setCurrentLocation();
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

    // set origin to be used in agm-direction
    // setOrigin( location : Location ) {
    //   this.origin = {
    //     lat: location[this.latKey],
    //     lng: location[this.longKey]
    //   };
    // }

    // set destination to be used in agm-direction
    // setDestination( location : Location ) {
    //   this.destination = {
    //     lat: location[this.latKey],
    //     lng: location[this.longKey]
    //   };
    // }

    // Move the marker to the location set by the input bar.
    onLocationSelected(location: Location) {
        this.latitude = location[this.latKey];
        this.longitude = location[this.longKey];
    }
}
