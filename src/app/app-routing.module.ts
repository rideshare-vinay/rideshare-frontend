import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DriverComponent } from './components/driver/driver.component';
import { MyCarComponent } from './components/my-car/my-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { MapDetailComponent } from './components/map-detail/map-detail.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';



const routes: Routes = [
  {path: 'home/drivers',component: DriverComponent}, 
  {path: 'home/riders',component: MapDetailComponent}, 
  {path: 'all-drivers',component: DriverInfoComponent}, 
  {path: 'login',component: LoginComponent}, 
  {path: 'login/admin',component: AdminLoginComponent}, 
  {path: 'admin',component: AdminComponent}, 
  {path: 'register',component: RegisterComponent}, 
  {path: 'new/car',component: CarRegisterComponent}, 
  {path: 'car',component: MyCarComponent}, 
  {path: 'profile',component: ProfileComponent},  
  {path: 'preference',component: PreferenceComponent},
  {path: 'map', component: GoogleMapsComponent},
  {path: '**',pathMatch: 'full',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
