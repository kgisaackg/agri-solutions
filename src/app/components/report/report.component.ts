import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

 constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  isLoading = false;

 private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {
     type: this.EXCEL_TYPE
   });
   FileSaver.saveAs(data, fileName + '_report'+ this.EXCEL_EXTENSION)
   this.isLoading = false;
 }

 ngOnInit(): void {
 }
 
 roles = [
  { name: 'Every User'},
  { name: 'Farmer' },
  { name: 'Agricultural Professional' },
  { name: 'Financial Administrator' },
];

 roleForm = this.formBuilder.group({
  role: [this.roles[3], Validators.required],
 })

 get role() {
  return this.roleForm.get('role');
 }

 users: User[] = [];
 
 userRole = '';

 onSubmit() {
   this.userRole = this.roleForm.value.role.name;
   this.getAllUsers(this.userRole)
 }

 
  getAllUsers(userR: string){
    this.isLoading = true;
  this.userService.getUsersByRole(userR)
  .subscribe({
    next: (res: any) => {
      this.users = res.map ( (document:any)=>{

       delete document.payload.doc.data().lastname
       delete document.payload.doc.data().firstname
        return {
          Firstname: document.payload.doc.data().firstname,
          Lastname: document.payload.doc.data().lastname,
          Email: document.payload.doc.data().emailAddress,
          Phone_No: document.payload.doc.data().phoneNumber,
          Role: document.payload.doc.data().role,
        }
      });
      this.exportAsXLSX();

    },
    error: (error: any) => {
      console.log('Eror msg')
      this.isLoading = false;
    }
  })
}

 //Report of all users, report by user category, report to have username and
 exportAsXLSX():void {
   
   this.exportAsExcelFile(this.users, 'user');
 }

}
