import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChatsComponent } from './components/chats/chats.component';
import { FarmerHomeComponent } from './components/farmer-home/farmer-home.component';
import { FarmingSolutionComponent } from './components/farming-solution/farming-solution.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { WeatherUpdatesComponent } from './components/weather-updates/weather-updates.component';

const routes: Routes = [
  {path: "", component: SigninComponent},
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "farmer-home", component: FarmerHomeComponent, children:[
    //have to change defaul to chats.
    {path: "", component: ChatsComponent},
    {path: "profile", component: ProfileComponent},
    {path: "profile-update", component: ProfileUpdateComponent},
    {path: "chats", component: ChatsComponent },
    {path: "weather-updates", component: WeatherUpdatesComponent},
    {path: "farmsolutions", component: FarmingSolutionComponent },
   
  ]},
  

  {path: "admin", component: AdminComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
