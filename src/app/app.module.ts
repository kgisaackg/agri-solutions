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
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
//import { FilterPipe } from './pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Firebase 

// Import the functions you need from the SDKs you need

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { AddFarmingSolutionComponent } from './components/add-farming-solution/add-farming-solution.component';
import { FarmSolutionCardComponent } from './components/farm-solution-card/farm-solution-card.component';
import { EditFarmingSolutionComponent } from './components/edit-farming-solution/edit-farming-solution.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ReportComponent } from './components/report/report.component';
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

// // Initialize Firebase

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
    AdminUsersComponent,
    AdminHomeComponent,
    AddFarmingSolutionComponent,
    FarmSolutionCardComponent,
    EditFarmingSolutionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    ChatListComponent,
    ReportComponent,
   // FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
