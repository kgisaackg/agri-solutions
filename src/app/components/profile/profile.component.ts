import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private auth: AuthenticationService) { }

  user: any;

  isLoading: boolean = false;

  user_id = localStorage.getItem("farmer_auth") as string;

  ngOnInit(): void {
    this.getUserById();
    this.auth.deleteUser();
  }
  
  getUserById(){
    this.isLoading = true;
    this.userService.getUserById(this.user_id)
    .subscribe({
      next: (res: any) => {
        this.user = res.data();
        this.isLoading = false;
      },
      error: (error) => {
         alert(error.message);
         this.isLoading = false;
      }
    });
  }

  toProfileUpdate(){
    console.log("Clicked");
    
    this.router.navigateByUrl("/farmer-home/profile-update");
  }

  areYouSure(){
    console.log("Are you sure");
    Swal.fire({
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      padding: '4px',
      width: '350px'
    }).then((result) => {
      if (result.isConfirmed) {
        //have to call delete api
        console.log("Then this will delete");
        
      }
    })
  }
}
