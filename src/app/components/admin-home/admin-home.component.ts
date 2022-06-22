import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/services/chats.service';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  numUser = 0;
  
  numInformationBoard = 0;

  numOfChats = 0;

  chatIsLoading = false;

  userIsLoading = false;

  numInformationIsLoading = false;
  

  constructor(private userService: UserService, private farmS: FarmingSolutionService, private chatService: ChatsService ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }


  users = [];
  getAllUsers(){
    this.userIsLoading = true;
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        });
        this.numUser = this.users.length
        this.userIsLoading = false;
      },
      error: (error: any) => {
        this.userIsLoading = true;
      }
    })
  }


}
