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
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapDetailComponent } from './components/map-detail/map-detail.component';
import { environment } from 'src/environments/environment';


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
    MapDetailComponent,
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
    BrowserAnimationsModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    FlexLayoutModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule
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
