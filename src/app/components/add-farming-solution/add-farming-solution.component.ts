import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FarmingSolution } from 'src/app/interface/farmingSolutions.interace';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-farming-solution',
  templateUrl: './add-farming-solution.component.html',
  styleUrls: ['./add-farming-solution.component.css']
})
export class AddFarmingSolutionComponent implements OnInit {

  isLoading: boolean = false;

  user_id = localStorage.getItem("farmer_auth") as string;
  user_email = localStorage.getItem("farmer_email") as string;

  constructor(private formBuilder: FormBuilder, private fmsService: FarmingSolutionService) { }

  farmSolution: FarmingSolution = {
    title: '',
    description: '',
    authour: 'Unknown',
    date: this.transformDate()
  };

  transformDate(){
    let date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    return date.getDate() + " " + month + " "+ date.getFullYear()
  }
  
  addFarmingSolutionForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    
  })

  ngOnInit(): void {
    console.log("Date", this.transformDate());
    
  }

  onSubmit(){
    this.isLoading = true;
    this.farmSolution = {
      ...this.addFarmingSolutionForm.value,
      authour: this.user_email,
      user_id: this.user_id,
      date: this.transformDate()
    }
  //  this.addFarmingSolution();

    this.fmsService.addFarmingSolution(this.farmSolution)
    .then(() => {
      Swal.fire(
        '',
        'Success'
      )
      this.isLoading = false
    })
    .catch( () => {
      Swal.fire(
        '',
        'Server error'
      )
       this.isLoading = false;
    }).finally( () => {
       this.addFarmingSolutionForm.reset();
    })
  }



  addFarmingSolution(){
    Swal.fire({
      text: "Are you sure want to post",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      padding: '4px',
      width: '350px'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("We will cal adding api", this.farmSolution);
        
      }else{
        console.log("is calleed");
    
      }
    })
  }
}
