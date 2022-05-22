import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IsloadingService } from 'src/app/services/isloading.service';
import { WeatherCallService } from 'src/app/services/weather-call.service';

@Component({
  selector: 'app-weather-updates',
  templateUrl: './weather-updates.component.html',
  styleUrls: ['./weather-updates.component.css']
})
export class WeatherUpdatesComponent implements OnInit {

  constructor(private weatherApi: WeatherCallService, 
    private formBuilder: FormBuilder, private auth: AuthenticationService,  public isloader: IsloadingService
    ) { }

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

  user: any;

  isLoading: boolean = false;

  cityForm = this.formBuilder.group({
    city: ['', Validators.required],
  });
  
  get city() {
    return this.cityForm.get('city');
  }

  errorMsg: string = '';
  
  loaderActive: boolean = false;

  onSubmit() { 
    let city = this.cityForm.value.city;
    console.log("City", city);
  }

}
