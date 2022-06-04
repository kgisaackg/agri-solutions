import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

import { Router } from '@angular/router';
import { IsloadingService } from 'src/app/services/isloading.service';
import { User } from '../../interface/user.interface';
import { AuthenticationService } from '../../services/authentication.service';

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    public isloader: IsloadingService
  ) {
     
  }

  ngOnInit(): void {}


  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMatch: true } : null;
  };
  
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
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9]).{6,}'),
      ],
    ],
    role: [this.roles[3], Validators.required],
    confirmPassword: ['', Validators.required],
  },{validators: this.passwordMatchValidator });


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

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  errorMsg: string = '';

  onSubmit() {
    this.user = {
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname,
      phoneNumber: this.signUpForm.value.phoneNumber,
      emailAddress: this.signUpForm.value.emailAddress,
      password: this.signUpForm.value.password,
      role: this.signUpForm.value.role.name,
    };

    this.isLoading = true;
    this.auth
      .signUp(this.user)
      .then(() => (this.isLoading = false))
      .finally(() => (this.isLoading = false));
  }
}


