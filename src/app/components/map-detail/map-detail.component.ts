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
  /**
   * The max number of recommendations to get for a rider.
   */
  private numberOfRecommendations: number = 5;
  /**
   * The current logged in user, used to pass information to the user-service.
   */
  private user: User = new User();
  /**
   * The recommended drivers returned as a list of Users.
   */
  public recommendations: User[];

  /**
   * A constructor to inject the necessary services.
   * @param googleMapsService Used to pass markers to google-maps.component.ts
   * @param authService Used to get the userId of the current user.
   * @param userService Used to get the rest of a user's information.
   * @param router Used to route back to login if no logged in user.
   */
  constructor(
    private googleMapsService: GoogleMapsService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * OnInit get the userId if it exists and getUserInfo().
   */
  ngOnInit() {
    this.user.userId = this.authService.user.userId;
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getUserInfo();
    }
  }

  /**
   * Get all the information of the logged in user using their userId. Then getDriverRecommendations().
   */
  public getUserInfo() {
    this.userService.getUserById(this.user.userId).then(user => {
      if (user) {
        this.user = user;
        this.getDriverRecommendations(this.numberOfRecommendations, this.user);
      } else {
        this.authService.user = {};
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Get driver recommendations from the user-service recommendation algorithm.
   * @param rider The user to get recommendations for.
   */
  public getDriverRecommendations(numOfRecommendations: number, rider: User) {
    this.googleMapsService
      .getDriverRecommendations(numOfRecommendations, rider)
      .subscribe(recommendations => {
        this.recommendations = recommendations;

        const markerList: Coordinates[] = [];
        console.log(recommendations);
        console.dir(recommendations);
        for (const recommendation of recommendations) {
          const marker: Coordinates = new Coordinates(
            recommendation.latitude,
            recommendation.longitude
          );
          markerList.push(marker);
        }

        this.googleMapsService.setCoordinatesList(markerList);
      });
  }

   /**
   * Get driver details
   */
  getDriverDetail(userId:number){
    this.router.navigate([`${"driver/detail"}/${userId}`]);
  }
}
