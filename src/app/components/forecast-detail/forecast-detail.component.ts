import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast5Days } from '../../model/forecast5Days.model';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-forecast-detail',
  templateUrl: './forecast-detail.component.html',
  styleUrls: ['./forecast-detail.component.css']
})
export class ForecastDetailComponent implements OnInit {
  zipCode: string;
  forecast5Days: Forecast5Days[] = [];
  cityName: string;
  alert: string;

  constructor(
    private forecastService: ForecastService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.zipCode = this.router.snapshot.paramMap.get('zipcode');
    if (this.zipCode !== null) {
      this.forecastService.get5DaysForecastByZipCode(this.zipCode).subscribe(
        res => {
          if (res.list.length > 0) {
            let filter5Days = [];
            filter5Days = res.list.filter(
              (x, index, self) =>
                index ===
                self.findIndex(
                  t => t.dt_txt.split(' ')[0] === x.dt_txt.split(' ')[0]
                )
            );
            if (filter5Days.length > 0) {
              filter5Days.forEach(forecast => {
                let aux = new Forecast5Days();
                this.cityName = res.city.name;
                aux.currentTemp = forecast.main.temp;
                aux.maxTemp = forecast.main.temp_max;
                aux.minTemp = forecast.main.temp_min;
                aux.date = forecast.dt_txt;
                if (forecast.weather.length > 0) {
                  aux.conditionImgUrl =
                    'https://openweathermap.org/img/wn/' +
                    forecast.weather[0].icon +
                    '@4x.png';
                    aux.condition = forecast.weather[0].main;
                }
                this.forecast5Days.push(aux);
              });
            }
            if (this.forecast5Days.length > 0) {
              this.forecast5Days.shift();
            }
          }
        },
        err => {
          this.alert = "Invalid ZipCode"
        }
      );
    }
  }
}
