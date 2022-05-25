import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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
    this.signInForm.addValidators(
      this.matchValidator(this.signInForm.get('confirmPassword') as any, this.signInForm.get('password') as any)
    );
  }

  ngOnInit(): void {}

  signInForm = this.formBuilder.group({
    confirmPassword: ['', Validators.required],
    password: ['', Validators.required],
  });

  get confirmPassword() {
    return this.signInForm.get('confirmPassword');
  }

  get password() {
    return this.signInForm.get('password');
  }

  errorMsg: string = '';

  loaderActive: boolean = false;

  matchValidator(control: AbstractControl, controlTwo: AbstractControl): any {
    console.log();
    return () => {
      if (control.value !== controlTwo.value)
        return { '': 'Value does not match' };
      return null;
    };
  }

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
