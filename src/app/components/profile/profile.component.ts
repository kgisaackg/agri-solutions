import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  user = {
    firstname: "John",
    lastname: "Doe",
    phoneNumber: "0721234567",
    emailAddress: "johndoe@gmail.com",
    role: "Farmer"
  }

  isLoading: boolean = false;

  ngOnInit(): void {
  }

  toProfileUpdate(){
    console.log("Clicked");
    
    this.router.navigateByUrl("/farmer-home/profile-update");
  }

  areYouSure(){
    console.log("Are you sure");
    
  }


  deleteNo(){
    console.log("NO");
    
  }

  deleteYes(){
    console.log("YES");
    
  }
}
