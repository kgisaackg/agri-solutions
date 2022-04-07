import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  isList: number = 0;
  isMenu: boolean = false;
  isMenuBtn() {
    this.isMenu = !this.isMenu;
  }
  isSearch: boolean = false;
  constructor() {}
  ngOnInit(): void {}

}
