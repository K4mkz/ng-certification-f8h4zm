import { Injectable } from '@angular/core';
import { Forecast } from '../model/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  setForecastList(forecastList: Forecast[]) {
    localStorage.setItem('forecastList', JSON.stringify(forecastList));
  }

  getForecastList() {
    return JSON.parse(localStorage.getItem('forecastList'));
  }
}