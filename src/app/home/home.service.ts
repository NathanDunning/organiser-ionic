import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  weather = null;
  constructor(private http: HttpClient) {}

  fetchWeather() {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=7910072&units=metric${
          environment.WeatherMapID
        }`
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
