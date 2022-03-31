import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { FarmerHomeComponent } from './components/farmer-home/farmer-home.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: "", component: SigninComponent},
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "farmer-home", component: FarmerHomeComponent, children:[
    //have to change defaul to chats.
    {path: "", component: ProfileComponent},
    {path: "profile", component: ProfileComponent},
    {path: "profile-update", component: ProfileUpdateComponent},
   
  ]},
  

  {path: "admin", component: AdminComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
