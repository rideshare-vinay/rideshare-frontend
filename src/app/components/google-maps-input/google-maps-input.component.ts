import { Component, OnInit } from "@angular/core";
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: "app-google-maps-input",
  templateUrl: "./google-maps-input.component.html",
  styleUrls: ["./google-maps-input.component.css"]
})

export class GoogleMapsInputComponent implements OnInit {
  public selectedAddress: PlaceResult;

  constructor() {}

  ngOnInit() {}

  onAutocompleteSelected(result: PlaceResult) {
    console.log("onAutocompleteSelected: ", result);
    console.log(result);
  }

  onLocationSelected(location: Location) {
    console.log("onLocationSelected: ", location);
    console.log(location);
  }
}
