import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IsloadingService } from 'src/app/services/isloading.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user: any;

  isLoading: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthenticationService,  public isloader: IsloadingService) {}

  ngOnInit(): void {}

  signInForm = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
  });
  
  get emailAddress() {
    return this.signInForm.get('emailAddress');
  }

  errorMsg: string = '';
  
  loaderActive: boolean = false;

  onSubmit() { 
    let emailAddress = this.signInForm.value.emailAddress;
    console.log("Forgot passord", emailAddress);
    this.auth.resetLink(emailAddress);
  }

}
