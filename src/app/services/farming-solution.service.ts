import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FarmingSolution } from '../interface/farmingSolutions.interace';

@Injectable({
  providedIn: 'root'
})
export class FarmingSolutionService {

  constructor(private afs: AngularFirestore) { }

  tableName = 'farmer_board'

  addFarmingSolution(farmSolution: FarmingSolution){
    let timeStamp = new Date().getTime();
    return this.afs.collection(`${this.tableName}/`).add({ ...farmSolution, createdAt: timeStamp});
  }

  updateFarmingSolution(farmSolution: FarmingSolution){
    console.log(farmSolution);
    
    return this.afs.doc(`${this.tableName}/` + farmSolution.id).update(farmSolution);
  }

  getFarmingSolutionById(farmSolutionId: string){
    return this.afs.collection(this.tableName).doc(farmSolutionId).get();
  }
  
  getAllFarmingSolution(){
    //db.collection('things').orderBy('createdAt').startAfter(today)
    return this.afs.collection(this.tableName, ref => ref.orderBy("createdAt", 'desc')).snapshotChanges();
  }

  deleteFarmingSolutionById(farmSolutionId: string){
   return this.afs.doc(`${this.tableName}/` + farmSolutionId).delete();
  }

  getAllFarmingSolutionByUserId(user_id: string){
    return this.afs.collection(this.tableName, ref => ref.where('user_id', "==", user_id)
    .orderBy("createdAt", 'desc'))
    .snapshotChanges();
  }
}
