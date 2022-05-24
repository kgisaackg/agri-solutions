import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Weather } from '../interface/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private afs: AngularFirestore) { }

  tableName = 'weather'

  addWeather(weather: Weather){
    return this.afs.collection(`${this.tableName}/`).add(weather);
  }
 
  updateWeather(weather: Weather){
    return this.afs.doc(`${this.tableName}/` + weather.id).update(weather);
  }
  
  getWeatherByUserId(user_id: string){
    return this.afs.collection(this.tableName, ref => ref.where('user_id', "==", user_id))
    .snapshotChanges();
  }
}
