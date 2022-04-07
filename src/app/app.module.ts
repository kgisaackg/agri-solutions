import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FarmerHomeComponent } from './components/farmer-home/farmer-home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsComponent } from './components/chats/chats.component';
import { WeatherUpdatesComponent } from './components/weather-updates/weather-updates.component';
import { FarmingSolutionComponent } from './components/farming-solution/farming-solution.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    LandingPageComponent,
    FarmerHomeComponent,
    AdminComponent,
    AdminDashboardComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    ChatsComponent,
    WeatherUpdatesComponent,
    FarmingSolutionComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
