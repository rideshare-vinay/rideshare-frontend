import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { DriverComponent } from './components/driver/driver.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserService } from './services/user-service/user.service';
import { CarService } from './services/car-service/car.service';
import { BatchService } from './services/batch-service/batch.service';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth-service/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyCarComponent } from './components/my-car/my-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { ValidationService } from './services/validation-service/validation.service';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DriverComponent,
    AdminComponent,
    LoginComponent,
    CarRegisterComponent,
    LoginComponent,
    NavbarComponent,
    MyCarComponent,
    ProfileComponent,
    PreferenceComponent,
    AdminLoginComponent,
    DriverInfoComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    CarService,
    BatchService,
    AuthService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
