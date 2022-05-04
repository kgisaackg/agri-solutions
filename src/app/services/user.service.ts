import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  tableName = 'user'

  updateUser(user: User){
    return this.afs.doc(`${this.tableName}/` + user.uid).update(user);
  }

  getUserById(userId: string){
    
    return this.afs.collection(this.tableName).doc(userId).get();
  }

  getAllUser(){
    return this.afs.collection(this.tableName).snapshotChanges();
  }

  deleteUserById(userId: string){
   return this.afs.doc(`${this.tableName}/` + userId).delete();
  }
}
