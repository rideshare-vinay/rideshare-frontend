import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps-service/google-maps.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { Coordinates } from 'src/app/models/coordinates';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css']
})
export class MapDetailComponent implements OnInit {
  private recommendations: User[];
  private user: User = new User();

  constructor(
    private googleMapsService: GoogleMapsService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user.userId = this.authService.user.userId;
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getUserInfo();
    }
  }

  public getUserInfo() {
    this.userService.getUserById(this.user.userId).then(user => {
      if (user) {
        this.user = user;

        this.googleMapsService
          .getDriverRecommendations(5, user)
          .subscribe(recommendations => {
            this.recommendations = recommendations;

            const markerList: Coordinates[] = [];
            for (const recommendation of recommendations) {
                const marker: Coordinates = new Coordinates(recommendation.latitude, recommendation.longitude);
                markerList.push(marker);
              }

            this.googleMapsService.setCoordinatesList(markerList);
          });
      } else {
        this.authService.user = {};
        this.router.navigate(['']);
      }
    });
  }
}
