import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  weather: any;
  iconUrl: string;
  temp?: number;

  constructor(private homeService: HomeService) {
    this.loadWeather();
  }

  // Method to load weather from API
  loadWeather() {
    this.homeService
      .fetchWeather()
      .then(value => {
        this.weather = value;
        this.iconUrl = `http://openweathermap.org/img/wn/${
          this.weather.weather[0].icon
        }@2x.png`;
        this.temp = Math.round((+this.weather.main.temp * 2) / 2);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {}
}
