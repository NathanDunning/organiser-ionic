import { Component, OnInit } from '@angular/core';

const newsUrl =
  'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=b4275ca6814546c28b1fef30e93e45c4';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss']
})
export class SocialPage implements OnInit {
  articles = [];
  constructor() {}

  ngOnInit() {
    this.fetchHeadlines();
  }

  async fetchHeadlines() {
    await fetch(newsUrl)
      .then(response => response.json())
      .then(data => {
        this.articles = data.articles;
      })
      .catch(err => {
        console.error(err);
      });
    console.log(this.articles);
  }
}
