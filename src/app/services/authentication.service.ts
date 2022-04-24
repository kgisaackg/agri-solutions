import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { getAuth, deleteUser } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base = environment.baseUrl; 

  auth = getAuth();
  userDel = this.auth.currentUser;

  constructor(private http: HttpClient, private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
   
   }

  signUp(user: any){
    return this.afAuth
      .createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then((result: any) => {
        this.createUser(user,result.user.uid);
        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signIn(user: any){
    this.afAuth.signInWithEmailAndPassword(user.emailAddress, user.password)
    .then((value:any)  => {
      //the below is a hack it has to be handled propery

      if(user.emailAddress != "admin@gmail.com" ){

        localStorage.setItem('farmer_auth', value.user.uid) 
        this.router.navigateByUrl('/farmer-home');     
      }else if(user.emailAddress == "admin@gmail.com"){
        
        localStorage.setItem('admin_auth', value.user.uid)
        this.router.navigateByUrl('/admin-dashboard');
      }else{
        //incase of error
      }

    })
    .catch((err:any) => {
      //incase of errors
      alert(err.message)

    });
  }

  signOut(){
    localStorage.removeItem("farmer_auth");
    //check if item is removed it will render to login or ?
  }

  createUser(user: any, id: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${id}`
    );

    console.log("Myuser", user);

    localStorage.setItem('farmer_auth', id)
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
}
