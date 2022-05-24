import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherCallService {

  baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

  apiId = "&appid=eae731c0e2989982b16602df40325877";
  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): any{
    let value =`${this.baseUrl}q=${city}${this.apiId}&units=metric`;
    return this.http.get<any>(value);
  }
}
