import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base = environment.baseUrl; 

  constructor(private http: HttpClient) { }
  signUp(user: any){

    let farmer_auth = {
      id: 12424,
      role: "farmer"
    }

    //this has to be set one user has successfully logged in.
    localStorage.setItem("farmer_auth", stringify(farmer_auth));
  }

  signIn(auth_detail: any){
    let farmer_auth = {
      id: 12424,
      role: "farmer"
    }

    //this has to be set one user has successfully logged in.
    localStorage.setItem("farmer_auth", stringify(farmer_auth));
  }

  signOut(){
    localStorage.removeItem("farmer_auth");
    //check if item is removed it will render to login or ?
  }

}
