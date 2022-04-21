import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base = environment.baseUrl; 

  constructor(private http: HttpClient, private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  signUp(user: any){

    let farmer_auth = {
      id: 12424,
      role: "farmer"
    }

    return this.afAuth

      .createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then((result) => {
        console.log("fsdf", user);
        
        this.SetUserData(user,result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    //this has to be set one user has successfully logged in.
    //localStorage.setItem("farmer_auth", stringify(farmer_auth));
  }

  signIn(auth_detail: any){
    let farmer_auth = {
      id: 12424,
      role: "farmer"
    }

    //this has to be set one user has successfully logged in.
    localStorage.setItem("farmer_auth", "");
  }

  signOut(){
    localStorage.removeItem("farmer_auth");
    //check if item is removed it will render to login or ?
  }

  SetUserData(user: any, id: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${id}`
    );

    console.log("Myuser", user);
    

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

}
