import { Component, OnInit } from '@angular/core';
import { FarmingSolution } from 'src/app/interface/farmingSolutions.interace';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farm-solution-card',
  templateUrl: './farm-solution-card.component.html',
  styleUrls: ['./farm-solution-card.component.css']
})
export class FarmSolutionCardComponent implements OnInit {

  isLoading = false;

  farmingSolution: FarmingSolution[] = [];

  isAddOpen = false;
  
  farmId: string = "";

  user_id = localStorage.getItem("farmer_auth") as string;

  constructor(private farmS: FarmingSolutionService, private userService: UserService) {     
  }

  ngOnInit(): void {
    this.getAllFarmingSolution();
   // this.getAllFarmingSolutionOfUser();
  }

  isAllFarmingSolution = true;
  getAllFarmingSolution(){
    this.isLoading = true;
    this.isAllFarmingSolution = true;
    this.farmS.getAllFarmingSolution().subscribe({
      next: (res: any) => {
        this.farmingSolution = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        })
        this.isLoading = false;
        console.log(this.farmingSolution);
        
        
      },
      error: (error: any) => {
        this.isLoading = true;
      }
    })
  }

  user: any;
  getUserById(id: string){
    this.isLoading = true;
    this.userService.getUserById(this.user_id)
    .subscribe({
      next: (res: any) => {
        this.user = res.data();
        this.isLoading = false;
      },
      error: (error) => {
         alert(error.message);
         this.isLoading = false;
      }
    });
  }
  
  getAllFarmingSolutionOfUser(){
    this.isLoading = true;
    this.isAllFarmingSolution = false;
    this.farmS.getAllFarmingSolutionByUserId(this.user_id).subscribe({
      next: (res: any) => {
        this.farmingSolution = res.map ( (document:any)=>{
          return {
            id: document.payload.doc.id,
            ...document.payload.doc.data() as any
          }
        });
        this.isLoading = false;
        console.log(this.farmingSolution);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
        
      }
    })
  }
  
  delete(id:any){
    console.log("Are you sure");
    Swal.fire({
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      padding: '4px',
      width: '350px'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFarmingSolution(id);
      }
    })
  }

  deleteFarmingSolution(id: any){
    this.farmS.deleteFarmingSolutionById(id)
    .then(() => {
      console.log("Done"); 
    })
    .catch(() => {
      console.log("Error");
    })
  }

  edit(id: any){
    console.log("Edit id", id);
    this.farmId = id;
    let isOpen = false
    this.isAddOpen = true;  
  }

  isAddToFalse(){
    this.isAddOpen = false;
    console.log("Thsi is cllaed", this.isAddOpen);
    
  }

  myIsAdd(value: any){
    console.log("My is add is cllaed");
    
  }

}

