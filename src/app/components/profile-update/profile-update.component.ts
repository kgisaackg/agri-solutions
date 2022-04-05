import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  roles = [
    { name: "Farmer" },
    { name: "Farmer Experts"},
    { name: "Financial Advisor"}
  ]

  selectedOption = "";

  updateForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    phoneNumber: ['', [Validators.required, Validators.pattern('(((0[6-8]))([0-9]{8}))')]],//^(((0[6-8]))([0-9]{8})) OR ((\\+27))[6-8][0-9]{8}
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: [this.roles[3], Validators.required]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
