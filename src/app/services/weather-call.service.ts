import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { weather } from '../interface/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherCallService {

  baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

  apiId = "&appid=eae731c0e2989982b16602df40325877";
  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): any{
    let value =`${this.baseUrl}q=soshanguve${this.apiId}&units=metric`;
    let g = value as unknown as weather;
    console.log("Service has been clalled", g);
    

    return this.http.get<weather>(value);
  }
}
