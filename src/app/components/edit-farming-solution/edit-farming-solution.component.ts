import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FarmingSolution } from 'src/app/interface/farmingSolutions.interace';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-farming-solution',
  templateUrl: './edit-farming-solution.component.html',
  styleUrls: ['./edit-farming-solution.component.css']
})

export class EditFarmingSolutionComponent implements OnInit {
  isLoading: boolean = false;

  @Input() farmId = '';

  @Output() isAddToFalse = new EventEmitter<boolean>();

  user_id = localStorage.getItem("farmer_auth") as string;

  constructor(private formBuilder: FormBuilder, private fmsService: FarmingSolutionService) { }

  farmSolution: FarmingSolution = {
    title: '',
    description: '',
    authour: '',
    date: new Date()
  };
  
  ngOnInit(): void {
    this.farmSolution.id = this.farmId;
    console.log("Edit id passed", this.farmSolution.id);
    
    this.getFormSolutionById();
  }

  editFarmingSolutionForm = this.formBuilder.group({
    title: [this.farmSolution.title, Validators.required],
    description: [this.farmSolution.description, Validators.required],
  })

  get title() { return this.editFarmingSolutionForm.get("title")}

  get description () { return  this.editFarmingSolutionForm.get("description")}

  onSubmit(){
    
    console.log(this.farmSolution.id);
    
    this.farmSolution = {
      id: this.farmId,
      ...this.editFarmingSolutionForm.value,
      authour: this.user_id,
      date: new Date(),
      demo: new Date().getTime()
    }
  
    console.log("On submit", this.farmSolution);
    
    this.updateUserConfirmation(this.farmSolution);
    this.close();
  }


  updateFormValues(farmSolution: any){
    this.title?.setValue(farmSolution.title);
    this.description?.setValue(farmSolution.description);
  }

  getFormSolutionById(){
    this.isLoading = true;
    this.fmsService.getFarmingSolutionById(this.farmSolution.id as any)
    .subscribe({
      next: (res: any) => {
        this.farmSolution = res.data();
        this.farmSolution.id = ""
        console.log(res.data());
        
        this.isLoading = false;
        this.updateFormValues(this.farmSolution)
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

  updateFarmSolution(farmSolution:any){
    this.isLoading = true;
    this.fmsService.updateFarmingSolution(farmSolution)
    .then(
      (res: any) => {
        this.isLoading = false; 
      }
    ).catch((error: any) => {
      Swal.fire(
        '',
        '*Internal Server Error',
      )
      console.log(error);
      
      this.isLoading = false;
    })
  }

  updateUserConfirmation(farmSolution: any){
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
        this.updateFarmSolution(farmSolution);
      }else{
        console.log("is calleed");
        this.getFormSolutionById();
        this.updateFormValues(this.farmSolution)
      }
    })
  }

  close(){
    this.isAddToFalse.emit(false)
  }

}
