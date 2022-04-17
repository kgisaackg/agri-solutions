import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  roles = [
    { name: 'Farmer' },
    { name: 'Agricultural Professional' },
    { name: 'Financial Administrator' },
  ];

  selectedOption = '';

  isLoading: boolean = false;
  
  user: User = {
    firstname: 'Isaac',
    lastname: 'Malebana',
    phoneNumber: '0721432424',
    emailAddress: 'isaac@gmail.com',
    role: "Financial Administrator",
  };

  updateForm = this.formBuilder.group({
    firstname: [
      this.user.firstname,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(3),
      ],
    ],
    lastname: [
      this.user.lastname,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*'),
      ],
    ],
    phoneNumber: [
      this.user.phoneNumber,
      [Validators.required, Validators.pattern('(((0[6-8]))([0-9]{8}))')],
    ], //^(((0[6-8]))([0-9]{8})) OR ((\\+27))[6-8][0-9]{8}
    emailAddress: [{value: this.user.emailAddress, disabled: true},, [Validators.required, Validators.email]],
    role: [this.roles[3]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}


  get firstname() {
    return this.updateForm.get('firstname');
  }

  get lastname() {
    return this.updateForm.get('lastname');
  }

  get phoneNumber() {
    return this.updateForm.get('phoneNumber');
  }

  get emailAddress() {
    return this.updateForm.get('emailAddress');
  }

  get role() {
    return this.updateForm.get('role');
  }


  onSubmit() {

    let roleName = this.updateForm.value.role ? this.updateForm.value.role.name : this.user.role;
    
    this.user = {
      firstname: this.updateForm.value.firstname,
      lastname: this.updateForm.value.lastname,
      phoneNumber: this.updateForm.value.phoneNumber,
      emailAddress: this.user.emailAddress,
      role: roleName
    };

    console.log("User", this.user);
    
  }
}
