import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  weather: any;

  constructor(private homeService: HomeService) {
    this.homeService
      .fetchWeather()
      .then(value => {
        this.weather = value;
        console.log(this.weather.main.temp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {}
}
