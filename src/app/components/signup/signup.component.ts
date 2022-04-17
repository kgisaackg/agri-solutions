import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  roles = [
    { name: 'Farmer' },
    { name: 'Agricultural Professional' },
    { name: 'Financial Administrator' },
  ];

  selectedOption = '';

  user: User = {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    role: '',
  };

  isLoading: boolean = false;
  
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  signUpForm = this.formBuilder.group({
    firstname: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(3),
      ],
    ],
    lastname: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern('(((0[6-8]))([0-9]{8}))')],
    ], //^(((0[6-8]))([0-9]{8})) OR ((\\+27))[6-8][0-9]{8}
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: [this.roles[3], Validators.required],
  });

  get firstname() {
    return this.signUpForm.get('firstname');
  }

  get lastname() {
    return this.signUpForm.get('lastname');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  get emailAddress() {
    return this.signUpForm.get('emailAddress');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get role() {
    return this.signUpForm.get('role');
  }

  errorMsg: string = '';

  loaderActive: boolean = false;

  onSubmit() {
    this.user = {
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname,
      phoneNumber: this.signUpForm.value.phoneNumber,
      emailAddress: this.signUpForm.value.emailAddress,
      password: this.signUpForm.value.password,
      role: this.signUpForm.value.role.name,
    };

    console.log("Sign Up", this.user);
    
    this.router.navigateByUrl('/farmer-home');
  }
}
