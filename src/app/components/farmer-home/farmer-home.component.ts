import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-farmer-home',
  templateUrl: './farmer-home.component.html',
  styleUrls: ['./farmer-home.component.css']
})
export class FarmerHomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  user_id = localStorage.getItem("farmer_auth") as string;

  username = "";

  ngOnInit(): void {
    this.userService.getUserById(this.user_id).subscribe((res: any) => {
      console.log(res.data().emailAddress);
      
      this.username = res.data().emailAddress;
    });
    
  }

  logOut(){
    this.router.navigateByUrl("/signin")
  }
}
