import { Component, OnInit } from '@angular/core';
import { WeatherCallService } from 'src/app/services/weather-call.service';

@Component({
  selector: 'app-weather-updates',
  templateUrl: './weather-updates.component.html',
  styleUrls: ['./weather-updates.component.css']
})
export class WeatherUpdatesComponent implements OnInit {

  constructor(private weatherApi: WeatherCallService) { }

  apikey = "";

  weather = {
    city: "",
    temp_max: "",
    icon: "",
    temp_min: "",
    humidity: "",
  };

  ngOnInit(): void {
    this.weatherApi.getWeatherByCity("Klerksdorp").subscribe(
    (res:any) => {
      this.weather = {
        ...res.main,
        ...res.weather[0],
        city: res.name
      }
      console.log("http://openweathermap.org/img/w/", this.weather);
      
    }
    
    )
    
  }

}
