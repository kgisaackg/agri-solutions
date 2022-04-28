import { Component, OnInit } from '@angular/core';
import { FarmingSolution } from 'src/app/interface/farmingSolutions.interace';
import { FarmingSolutionService } from 'src/app/services/farming-solution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farm-solution-card',
  templateUrl: './farm-solution-card.component.html',
  styleUrls: ['./farm-solution-card.component.css']
})
export class FarmSolutionCardComponent implements OnInit {

  isLoading = false;

  farmingSolution: FarmingSolution[] = [];

  constructor(private farmS: FarmingSolutionService) { }

  ngOnInit(): void {
    this.getAllFarmingSolution();
  }

  getAllFarmingSolution(){
    this.isLoading = true;
    this.farmS.getAllFarmingSolution().subscribe({
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
        this.isLoading = true;
      }
    })
  }

  getAllFarmingSolutionOfUser(){

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
}
