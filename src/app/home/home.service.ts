import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  fetchWeather() {
    const http = this.http;

    return new Promise((resolve, reject) => {
      http
        .get<any>(
          `https://api.openweathermap.org/data/2.5/weather?id=7910072&units=metric${
            environment.WeatherMapID
          }`
        )
        .subscribe(response => {
          resolve(response);
        });
    });
  }
}
