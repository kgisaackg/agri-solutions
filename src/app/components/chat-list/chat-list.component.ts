import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  user_id = localStorage.getItem("farmer_auth") as string;

  constructor(private userService: UserService, private farmS: FarmingSolutionService,
    private router: Router) {
    this.getAllUsers();
   }

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
  }

  getAllUsers(){
    this.isLoading = true;
    this.userService.getAllUsersOtherThanMe(this.user_id)
    .subscribe({
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

  chatWith(user: any){
    console.log("chat with ", user.uid)
    localStorage.setItem('toUser', user.uid);
    this.router.navigateByUrl('/farmer-home/chats', {state: {user}})
  }
}
