import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  
  user_id = localStorage.getItem("farmer_auth") as string;

  user: User = {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    emailAddress: '',
    role: "",
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserById();
  //  this.updateUserConfirmation();
  
  }


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
    role: [{value: this.user.role, disabled: true}],
  });

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

  updateFormValues(user: any){
    this.firstname?.setValue(user.firstname);
    this.lastname?.setValue(user.lastname);
    this.phoneNumber?.setValue(user.phoneNumber);
    this.emailAddress?.setValue(user.emailAddress)
    this.role?.setValue(user.role)
  }

  getUserById(){
    this.isLoading = true;
    this.userService.getUserById(this.user_id)
    .subscribe({
      next: (res: any) => {
        this.user = res.data();
        this.isLoading = false;
        this.updateFormValues(this.user)
      },
      error: (error) => {
        Swal.fire(
          '',
          'Server error'
        )
         this.isLoading = false;
      }
    });
  }

  updateUser(user:any){
    this.isLoading = true;
    this.userService.updateUser(user)
    .then(
      (res: any) => {
        this.isLoading = false; 
      }
    ).catch(() => {
      Swal.fire(
        '',
        'Server error'
      )
      this.isLoading = false;
    })
  }

  onSubmit() {
    let roleName = this.updateForm.value.role ? this.updateForm.value.role.name : this.user.role;
    
    this.user = {
      uid: this.user_id,
      firstname: this.updateForm.value.firstname,
      lastname: this.updateForm.value.lastname,
      phoneNumber: this.updateForm.value.phoneNumber,
      emailAddress: this.user.emailAddress,
      role: roleName
    }; 

    //this.updateUser(this.user);
    this.updateUserConfirmation(this.user);
  }

  updateUserConfirmation(user: any){
    Swal.fire({
      text: "Are you sure you want to update?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update!',
      padding: '4px',
      width: '350px'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateUser(user);
      }else{
        console.log("is calleed");
        this.getUserById();
        this.updateFormValues(this.user)
      }
    })
  }
}
