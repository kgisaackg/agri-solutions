import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-home',
  templateUrl: './farmer-home.component.html',
  styleUrls: ['./farmer-home.component.css']
})
export class FarmerHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigateByUrl("/signin")
  }
}
