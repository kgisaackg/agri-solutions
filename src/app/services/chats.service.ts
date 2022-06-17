import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  tableName = 'chat';

  addChat(chat: any){
    let timeStamp = new Date().getTime();

    return this.afs.collection(`${this.tableName}/`).add({ ...chat, time: timeStamp});
  }

  getMessagesForUserById(user_id: string, recipient: string){
    let attemptA = user_id + recipient;
    let attemptB = recipient + user_id;

    return this.afs.collection(this.tableName, ref => 
    ref
    .where('recipient' , "in" ,[attemptA, attemptB])
    .orderBy("time", 'asc'))
    .snapshotChanges();
  }

  getUserForMessage(msgFrom: string, users: any[]){
    for(let user of users){
      if(user.uid === msgFrom){
        return user.email;
      }
    }
    return "deleted.";
  }
}
