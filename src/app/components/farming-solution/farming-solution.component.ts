import { Component, OnInit } from '@angular/core';
import { FarmingSolution } from 'src/app/interface/farmingSolutions.interace';

@Component({
  selector: 'app-farming-solution',
  templateUrl: './farming-solution.component.html',
  styleUrls: ['./farming-solution.component.css']
})
export class FarmingSolutionComponent implements OnInit {

  farmSolution: FarmingSolution = {
    title: '',
    description: '',
    authour: '',
    date: new Date()
  };

  isAddOpen = false;

  btnText = "Add"
  
  constructor() { }

  ngOnInit(): void {
  }

  //toggle add
  openAdd(){
    let isOpen = false
    this.isAddOpen = this.isAddOpen == isOpen ? true : false;     
    this.btnText = this.isAddOpen == isOpen ? "Add" : "View";             
  }
}
