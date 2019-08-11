import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';

import { Parse } from 'parse';

import { environment } from 'src/environments/environment';

Parse.serverURL = 'https://parseapi.back4app.com'; // Server URL
Parse.initialize(
  `${environment.ParseServerApplicationID}`, // Application ID
  `${environment.ParseServerJSKey}` // Javascript key
);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
  event = {
    startTime: '',
    endTime: ''
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.getEvents();
  }

  ngOnInit() {
    this.resetEvent();
  }

  async getEvents() {
    const getEvents = Parse.Object.extend('Calendar');
    const query = new Parse.Query(getEvents);

    query.equalTo('user', Parse.User.current());

    await query.find().then(results => {
      results.map(data => {
        console.log(data.attributes);
        const event = {
          title: data.attributes.title,
          startTime: new Date(data.attributes.startTime),
          endTime: new Date(data.attributes.endTime),
          allDay: false
        };
        this.eventSource.push(event);
      });
    });
    await this.myCal.loadEvents();
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  }

  // Create the right event format and reload source
  addEvent() {
    this.router.navigate(['/add', this.event]);
  }

  // Change current month/week/day
  next() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }
}
