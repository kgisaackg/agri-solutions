import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChatsComponent } from './components/chats/chats.component';
import { FarmerHomeComponent } from './components/farmer-home/farmer-home.component';
import { FarmingSolutionComponent } from './components/farming-solution/farming-solution.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { WeatherUpdatesComponent } from './components/weather-updates/weather-updates.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path: "landing", component: LandingPageComponent},
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "forgotpassword", component: ForgotPasswordComponent},
  {path: "resetpassword", component: ResetPasswordComponent},
  {path: "farmer-home", component: FarmerHomeComponent, children:[

    {path: "", component: ChatListComponent},
    {path: "chatlist", component: ChatListComponent},
    {path: "chats", component: ChatsComponent },
    {path: "profile", component: ProfileComponent},
    {path: "profile-update", component: ProfileUpdateComponent},
    {path: "weather-updates", component: WeatherUpdatesComponent},
    {path: "farmsolutions", component: FarmingSolutionComponent },
   
  ]},
  {path: "admin", component: AdminComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent, children:
  [
    {path: "", component: AdminHomeComponent},
    {path: "admin-home", component: AdminHomeComponent},
    {path: "admin-users", component: AdminUsersComponent}
  ]},

  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
