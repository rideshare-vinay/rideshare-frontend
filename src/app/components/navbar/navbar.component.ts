import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/models/user';
import { Admin } from 'src/app/models/admin';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

  /**
   * The Navbar component
   */

export class NavbarComponent implements OnInit {
  public navBarOpen = true;
  isOpen = false ; 
  
  /**
   * This is a name string.
   */

  name: string = '';
  admin: string = '';
  isDriver : boolean;

  
  /**
   * This is a constructor
   * @param router Provides an instance of a router.
   * @param userService A dependency of an user service is injected.
   * @param authService A dependency of an auth service is injected.
   */

  constructor(private router: Router, private userService: UserService, public authService: AuthService, private eRef: ElementRef) { }

  /**
   * This is an OnInit function that sets the token to the parsed token string.
   * The system will check if the token is valid and send the token to the user service.
   * An auth service is invoked and the Navbar will listen to the logged in event.
   * The navbar will change after user login or sign up
   */

  ngOnInit() {
    if (this.authService.user.userId) {
      this.userService.getUserById(this.authService.user.userId).then((response)=>{
        this.name = response.firstName;
      })
    }

    this.authService.getEmitter().subscribe((user: any) => {
      if (user.userId) {
        this.name = user.firstName;
        this.isDriver = user.driver;
      } else if (user.adminId) {
        this.admin = user.userName;
      }
    });

    this.userService.getEmitter().subscribe((user: User) => {
      this.name = user.firstName;
      
    });
  }

   /**
   * Function that takes no parameters. 
   * It will clear the sesssion storage.
   * @return {void} 
   * 
   */

  logout() {
    this.authService.user = {};
    this.name = '';
    this.admin = '';
    
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)&&this.isOpen == true) {
      console.log(this.isOpen);
      this.isOpen = false;
      //this.navBarOpen = false;
     
      //navbar.classList.remove('show');
    } 
  }
}
