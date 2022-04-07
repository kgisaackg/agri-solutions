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
      firstname: "Isaac",
      lastname: "Malebana",
      phoneNumber: "0721342222",
      emailAddress: "isaacka@gmail.com",
      role: "farmer"
    },
    {
      firstname: "Kagiso",
      lastname: "Malebana",
      phoneNumber: "0721342222",
      emailAddress: "isaacka@gmail.com",
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
