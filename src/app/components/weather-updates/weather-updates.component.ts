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

  isUserLocationNew = true;

  isWeatherLoading = false;
  weatherId: string = '';

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
    this.getWeatherByUserId();
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

  onSubmit() {
    this.mycity = this.cityForm.value.city;
    console.log('City', this.mycity);

    let myWeather: Weather = {
      user_id: this.user_id,
      location: this.mycity,
      notification: false,
    };
    if (this.isUserLocationNew) this.setWeatherByUserId(myWeather);
    else{
      myWeather = {...myWeather, id: this.weatherId}
       this.updateWeatherByUserId(myWeather)
    };
  }

  isFound = true;
  getWeatherByCity() {
    console.log("fsafds af a");
    
    this.weatherApi.getWeatherByCity(this.mycity).subscribe((res: any) => {
      this.weather = {
        ...res.main,
        ...res.weather[0],
        city: res.name,
      };
      this.isFound = true;
    }, (error:any) => {
      this.isFound = false;
      console.log(error.error.message);
    });
  }

  getWeatherByUserId() {
    this.isWeatherLoading = true;
    this.weatherService.getWeatherByUserId(this.user_id).subscribe({
      next: (res: any) => {
        let theWeather = res.map((document: any) => {
          return {
            id: document.payload.doc.id,
            ...(document.payload.doc.data() as any),
          };
        });

        this.isUserLocationNew = theWeather.length == 0;
        if (!this.isUserLocationNew) {
          this.mycity = theWeather[0].location;
          this.weatherId = theWeather[0].id
          this.city?.setValue(this.mycity);
        }

        this.getWeatherByCity();

        this.isWeatherLoading = false;
      },
      error: (error) => {
        Swal.fire('', 'Server error');
        this.isWeatherLoading = false;
      },
    });
  }

  updateWeatherByUserId(weather: Weather) {
    this.isLoading = true;
    this.weatherService
      .updateWeather(weather)
      .then((res: any) => {
        console.log("This is the called updated.")
        this.getWeatherByCity();

        this.isLoading = false;
      })
      .catch((error: any) => {
        Swal.fire('', '*Internal Server Error');
        console.log(error);

        this.isLoading = false;
      });
  }

  setWeatherByUserId(myWeather: Weather) {
    this.isLoading = true;
    this.weatherService
      .addWeather(myWeather)
      .then(() => {
        Swal.fire('', 'Success');
        this.isLoading = false;
      })
      .catch(() => {
        Swal.fire('', 'Server error');
        this.isLoading = false;
      })
      .finally(() => {});
  }
}
