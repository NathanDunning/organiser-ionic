import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Parse } from 'parse';

import { environment } from 'src/environments/environment';

Parse.serverURL = 'https://parseapi.back4app.com'; // Server URL
Parse.initialize(
  `${environment.ParseServerApplicationID}`, // Application ID
  `${environment.ParseServerJSKey}` // Javascript key
);

@Injectable({
  providedIn: 'root'
})
export class AddService {
  constructor(private alertCtrl: AlertController, private router: Router) {}

  // Service to add a new event to the calendar
  addEvent(event: any) {
    const Calendar = Parse.Object.extend('Calendar');
    const newEvent = new Calendar();

    newEvent.set('user', Parse.User.current());
    newEvent.set('title', event.title);
    newEvent.set('location', event.location);
    newEvent.set('startTime', event.startTime);
    newEvent.set('endTime', event.endTime);

    newEvent.save().then(
      result => {
        const evCopy = {
          ...event,
          id: result.id
        };
        location.replace(window.location.href.replace('add', 'calendar'));
      },
      error => {
        this.presentAlert();
      }
    );
  }

  // Alert for unable to create error
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Unable to create new event',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigateByUrl('/calendar');
  }
}
