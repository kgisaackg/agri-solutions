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
    firstname: "Isaac",
    lastname: "Malebana",
    phoneNumber: "0721234567",
    emailAddress: "isaac@gmail.com",
    role: "Farmer"
  }

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
