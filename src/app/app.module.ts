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


//Firebase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Dk1IQRFCPAUm_FJDT6W02OFDKq9AJEo",
  authDomain: "the-agri-solutions.firebaseapp.com",
  projectId: "the-agri-solutions",
  storageBucket: "the-agri-solutions.appspot.com",
  messagingSenderId: "693743764374",
  appId: "1:693743764374:web:8d81a97b5058bfd299d3b7",
  measurementId: "G-Q6RP5SX993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//end of firebase 
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
    ProfileUpdateComponent
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
