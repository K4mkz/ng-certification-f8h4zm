import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from '../model/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private readonly API = 'https://api.openweathermap.org/data/2.5';
  constructor(private http: HttpClient) {}

  getForecastByZipCode(zipCode: string): Observable<any> {
    return this.http.get<any>(
      this.API +
        '/weather?zip=' +
        zipCode +
        ',us&appid=5a4b2d457ecbef9eb2a71e480b947604'
    );
  }

  get5DaysForecastByZipCode(zipCode: string): Observable<any> {
    return this.http.get<any>(
      this.API +
        '/forecast?zip=' +
        zipCode +
        ',us&appid=5a4b2d457ecbef9eb2a71e480b947604'
    );
  }
}
