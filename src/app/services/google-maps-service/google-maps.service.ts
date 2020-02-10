import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private url : string;
 
  constructor( private http:HttpClient ) { 
    this.url = 'http://localhost:9000/';
  }

  public getPoints( origin : string , destination : string ) : Observable <any> {
    // console.log( origin )
    // return this.http.post <any>( 'http://localhost:4200/directions/' + origin + '/' + destination );
    console.log( origin, destination );
    return this.http.get<any>( this.url +'points/' + origin + '/' + destination );
  };

  public decodePolyline() {
    
  }

}
