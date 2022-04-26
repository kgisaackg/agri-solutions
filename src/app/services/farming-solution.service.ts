import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FarmingSolution } from '../interface/farmingSolutions.interace';

@Injectable({
  providedIn: 'root'
})
export class FarmingSolutionService {

  constructor(private afs: AngularFirestore) { }

  tableName = 'farming'

  addFarmingSolution(farmSolution: FarmingSolution){
    let timeStamp = new Date().getTime();
    return this.afs.collection(`${this.tableName}/`).add({ ...farmSolution, createdAt: timeStamp});
  }

  updateFarmingSolution(farmSolution: FarmingSolution){
    return this.afs.doc(`${this.tableName}/` + farmSolution.uid).update(farmSolution);
  }

  getFarmingSolutionById(farmSolutionId: string){
    return this.afs.collection(this.tableName).doc(farmSolutionId).get();
  }
  
  getAllFarmingSolution(){
    //db.collection('things').orderBy('createdAt').startAfter(today)
    return this.afs.collection(this.tableName, ref => ref.orderBy("createdAt")).snapshotChanges();
  }

  deleteFarmingSolutionById(farmSolutionId: string){
   return this.afs.doc(`${this.tableName}/` + farmSolutionId).delete();
  }
}