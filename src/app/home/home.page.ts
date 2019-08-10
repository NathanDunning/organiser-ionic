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

  constructor(private homeService: HomeService) {
    this.homeService
      .fetchWeather()
      .then(value => {
        this.weather = value;
        this.iconUrl = `http://openweathermap.org/img/wn/${
          this.weather.weather[0].icon
        }@2x.png`;
      })
      .catch(err => {
        console.log(err);
      });
  }

  setImage(icon: string) {
    this.iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  ngOnInit() {}
}
