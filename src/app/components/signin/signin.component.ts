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
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: [this.roles[3], Validators.required]
  })

  get emailAddress() {return this.signInForm.get("emailAddress")}

  get password() {return this.signInForm.get("password")}

  get role() {return this.signInForm.get("role")}

  errorMsg: string = "";

  loaderActive: boolean = false;

  onSubmit(){
    console.log(this.signInForm.value);
    //have to create auth


    this.router.navigateByUrl("/farmer-home");
  }
}
