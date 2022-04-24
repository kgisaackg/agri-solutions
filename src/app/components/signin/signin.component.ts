import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  roles = [
    { name: 'Farmer' },
    { name: 'Agricultural Professional' },
    { name: 'Financial Administrator' },
  ];

  selectedOption = '';

  user: any;

  isLoading: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  signInForm = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    //role: [this.roles[3], Validators.required],
  });
  
  get emailAddress() {
    return this.signInForm.get('emailAddress');
  }

  get password() {
    return this.signInForm.get('password');
  }

  // get role() {
  //   return this.signInForm.get('role');
  // }

  errorMsg: string = '';
  
  loaderActive: boolean = false;

  onSubmit() {
    this.user = {
      emailAddress: this.signInForm.value.emailAddress,
      password: this.signInForm.value.password,
    };
    
    this.auth.signIn(this.user);
  }
}
