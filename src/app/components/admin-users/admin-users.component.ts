import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService, private farmS: FarmingSolutionService) { }

  searchText = "";

  users: User[] = [];

  isLoading = false;

  farm = {
    title: "saving Money 001",
    description: "lorem text will go here",
    authour: "User_id",
    date: new Date(),
    demo: new Date().getTime()
  }

  test: number[] = [1, 2, 3,4,5];

  
  ngOnInit(): void {
   this.getAllUsers();
   //this.getAllFarmingSolution();
    console.log( new Date().getTime());
  }

  farmingSolution = [];
  getAllFarmingSolution(){
    this.isLoading = true;
    this.farmS.getAllFarmingSolution().subscribe({
      next: (res: any) => {
        this.farmingSolution = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        });
        this.isLoading = false;
        console.log(this.farmingSolution);
        
      },
      error: (error: any) => {
        this.isLoading = true;
      }
    })
  }

  getAllUsers(){
    this.isLoading = true;
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        });
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = true;
      }
    })
  }

}
