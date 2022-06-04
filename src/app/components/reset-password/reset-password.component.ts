import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IsloadingService } from 'src/app/services/isloading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  user: any;

  isLoading: boolean = false;

  constructor(
    private router: ActivatedRoute,
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

  signInForm = this.formBuilder.group({
    confirmPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9]).{6,}'),]],
  },{validators: this.passwordMatchValidator });

  get confirmPassword() {
    return this.signInForm.get('confirmPassword');
  }

  get password() {
    return this.signInForm.get('password');
  }

  errorMsg: string = '';

  loaderActive: boolean = false;

  onSubmit() {
    const code = this.router.snapshot.queryParams['oobCode'];
    this.user = {
      confirmPassword: this.signInForm.value.confirmPassword,
      password: this.signInForm.value.password,
    };

    console.log('Reset Password', this.user);
    this.auth.resetPassword(code, this.user.password);
  }


}
