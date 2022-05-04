import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router, UrlSegment } from '@angular/router';

import { getAuth, deleteUser } from "firebase/auth";
import { IsloadingService } from './isloading.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth = getAuth();
  userDel = this.auth.currentUser;

  constructor(private http: HttpClient, private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private isLoadingService: IsloadingService) {
   
   }

  signUp(user: any){
    this.isLoadingService.isLoading.next(true);
    return this.afAuth
      .createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then((result: any) => {
        this.createUser(user,result.user.uid)
        .finally(() => this.isLoadingService.isLoading.next(false))
        
      })
      .catch((error) => {
        this.isLoadingService.isLoading.next(false);
        this.errorAlert(error)
      });
  }

  signInAdmin(user: any){
    if(user.role == "admin")
      this.signIn(user);
    else{
      this.errorAlert("invalid user credentials.")
    }
  }

  signIn(user: any){
    this.isLoadingService.isLoading.next(true);

    
    this.afAuth.signInWithEmailAndPassword(user.emailAddress, user.password)
    .then((value:any)  => {
      //the below is a hack it has to be handled propery

      if(user.role !== "admin"){
        localStorage.setItem('farmer_auth', value.user.uid) 
        console.log(value.user);
        
        localStorage.setItem('farmer_email', value.user.email) 
        this.router.navigateByUrl('/farmer-home');   

      }else if(user.emailAddress == "admin@gmail.com" && user.role == "admin"){  
        localStorage.setItem('admin_auth', value.user.uid)
        this.router.navigateByUrl('/admin-dashboard');
      }else{
        this.myError();
        
      }
      this.isLoadingService.isLoading.next(false);

    })
    .catch((err:any) => {
      //incase of errors
      //alert(cust[0])
      this.isLoadingService.isLoading.next(false);

      this.errorAlert(err)

    });
  }

  signOut(){
    localStorage.removeItem("farmer_auth");
    //check if item is removed it will render to login or ?
  }

  createUser(user: any, id: any) {
    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user/${id}`
    );

    console.log("Myuser", user);

    localStorage.setItem('farmer_auth', id)
    localStorage.setItem('farmer_email', user.emailAddress) 
    this.router.navigateByUrl('/farmer-home');
    
    const userData = {
      uid: id,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      role: user.role
    };
    return userRef.set({...userData}, {
      merge: true,
    });
  }

  deleteUser(){

    this.afAuth.authState.subscribe(user => {
      if (user){
        //this.userState = user.delete;
        let userAcc = this.afAuth.currentUser;
        console.log("Current Users Afth", userAcc);
        deleteUser(userAcc as any).then(() => {
          // User deleted.
          console.log("user has been delete");
          
        }).catch((error) => {
          // An error ocurred
          // ...
          console.log("Cannot delet", error);
          
        });
       // localStorage.setItem('userId', user.uid);
      } else {
        localStorage.setItem('user', "null");
      }
    });

    
  }

  errorAlert(err: any){
    let removeFirebase = err.message.split(":")
    let cust = removeFirebase[1].split("(");
    //this.isLoadingService.isLoading.next(false)
    Swal.fire({
      text: cust[0],
      color: '#FF0000',
      showConfirmButton: false,
      showCloseButton: true,
      padding: '2px',
      timer: 2500
    })
  }

  myError(){
    Swal.fire({
      text: "The password is invalid or the user does not have a password",
      color: '#FF0000',
      showConfirmButton: false,
      showCloseButton: true,
      padding: '2px',
      timer: 2500
    })
  }

}
