import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private homeService: HomeService) {
    this.homeService.fetchWeather();
  }

  ngOnInit() {}
}
