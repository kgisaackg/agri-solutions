import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  roles = [
    { name: "Farmer" },
    { name: "Farmer Experts"},
    { name: "Financial Advisor"}
  ]

  selectedOption = "";

  signInForm = this.formBuilder.group({
    emailAddress: ['', Validators.required],
    password: ['', Validators.required],
    role: [this.roles[3], Validators.required]
  })

  onSubmit(){
    console.log(this.signInForm.value);
    this.router.navigateByUrl("/farmer-home");
  }
}
