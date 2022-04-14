import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor() { }

  filteredString: string = "";
  
  ngOnInit(): void {
  }

  users = [
    {
      firstname: "John 1",
      lastname: "Doe 1",
      phoneNumber: "0721342222",
      emailAddress: "johndoe@gmail.com",
      role: "farmer"
    },
    {
      firstname: "John 2",
      lastname: "Doe 2",
      phoneNumber: "0721342222",
      emailAddress: "joedoe2@gmail.com",
      role: "Financial Advisor"
    }, 
    {
      firstname: "John",
      lastname: "Doe",
      phoneNumber: "0721342222",
      emailAddress: "isaacka@gmail.com",
      role: "farmer"
    },
  ]

}
