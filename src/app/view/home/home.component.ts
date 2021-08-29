import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Forecast } from '../../model/forecast.model';
import { ForecastService } from '../../services/forecast.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zipCode: string;
  forecastList: Forecast[];
  alert: string;
  constructor(
    private forecastService: ForecastService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('forecastList') === null) {
      this.forecastList = [];
      this.sessionService.setForecastList(this.forecastList);
    } else {
      this.forecastList = this.sessionService.getForecastList();
    }
  }

  addLocation() {
    this.alert = null;
    this.forecastService.getForecastByZipCode(this.zipCode).subscribe(
      res => {
        if (res !== null) {
          console.log(res);
          if (this.forecastList.find(x => x.zipCode == this.zipCode) == null) {
            let forecast = new Forecast();
            forecast.name = res.name;
            forecast.zipCode = this.zipCode;
            if (res.weather.length > 0) {
              forecast.conditionImgUrl =
                'https://openweathermap.org/img/wn/' +
                res.weather[0].icon +
                '@4x.png';
              forecast.condition = res.weather[0].main;
            }
            forecast.currentTemp = res.main.temp;
            forecast.minTemp = res.main.temp_min;
            forecast.maxTemp = res.main.temp_max;
            this.forecastList.push(forecast);
            this.sessionService.setForecastList(this.forecastList);
          } else {
            this.alert = 'ZipCode already added';
          }
        }
      },
      err => {
        this.alert = 'Invalid ZipCode';
      }
    );
  }

  removeForecast(index: number) {
    this.forecastList.splice(index, 1);
    this.sessionService.setForecastList(this.forecastList);
  }
}
