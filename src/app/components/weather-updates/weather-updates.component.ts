import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Weather } from 'src/app/interface/weather.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IsloadingService } from 'src/app/services/isloading.service';
import { WeatherCallService } from 'src/app/services/weather-call.service';
import { WeatherService } from 'src/app/services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weather-updates',
  templateUrl: './weather-updates.component.html',
  styleUrls: ['./weather-updates.component.css'],
})
export class WeatherUpdatesComponent implements OnInit {
  mycity = 'soShanGuve';
  
  user_id = localStorage.getItem("farmer_auth") as string;

  constructor(
    private weatherApi: WeatherCallService,
    private weatherService: WeatherService,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    public isloader: IsloadingService
  ) {}

  apikey = '';

  weather = {
    city: '',
    temp_max: '',
    icon: '',
    temp_min: '',
    humidity: '',
  };

  ngOnInit(): void {
    this.weatherApi.getWeatherByCity(this.mycity).subscribe((res: any) => {
      this.weather = {
        ...res.main,
        ...res.weather[0],
        city: res.name,
      };
      console.log('http://openweathermap.org/img/w/', this.weather);
    });
  }

  user: any;

  isLoading: boolean = false;

  cityForm = this.formBuilder.group({
    city: [this.mycity, Validators.required],
  });

  get city() {
    return this.cityForm.get('city');
  }

  errorMsg: string = '';

  loaderActive: boolean = true;

  onSubmit() {
    this.mycity = this.cityForm.value.city;
    console.log('City', this.mycity);

    let myWeather: Weather = {
      user_id: this.user_id,
      location: this.mycity,
      notification: false
    }

    this.setWeatherByUserId(myWeather);
  }

 
  getWeatherByUserId() {
    this.isLoading = true;
    this.weatherService.getWeatherByUserId(this.user_id).subscribe({
      next: (res: any) => {
        console.log(res.data());
        this.isLoading = false;
      },
      error: (error) => {
        Swal.fire('', 'Server error');
        this.isLoading = false;
      },
    });
  }

  upWeatherByUserId(weather: Weather) {
    this.isLoading = true;
    this.weatherService
      .updateWeather(weather)
      .then((res: any) => {
        this.isLoading = false;
      })
      .catch((error: any) => {
        Swal.fire('', '*Internal Server Error');
        console.log(error);

        this.isLoading = false;
      });
  }

  setWeatherByUserId(myWeather: Weather) {
    this.weatherService.addWeather(myWeather)
    .then(() => {
      Swal.fire(
        '',
        'Success'
      )
      this.isLoading = false
    })
    .catch( () => {
      Swal.fire(
        '',
        'Server error'
      )
       this.isLoading = false;
    }).finally( () => {
    })
  }
}
