import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/login/login.service';
import { AddService } from './add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit {
  User: object;

  calendarEvent = {
    title: '',
    location: '',
    startTime: '',
    endTime: ''
  };

  eventStart: Date;
  eventEnd: Date;

  startDate = '2019-01-01';
  startTime = 'T00:00Z';
  endDate = '2019-01-02';
  endTime = 'T00:00Z';

  constructor(
    private addService: AddService,
    private auth: LoginService,
    public alertController: AlertController
  ) {}

  // Listener for date change
  startDateChanged(date) {
    this.startDate = date.detail.value.substring(0, 10);
  }

  // Listener for date change
  startTimeChanged(date) {
    this.startTime = date.detail.value.substring(10, 25);
  }

  // Listener for date change
  endDateChanged(date) {
    this.endDate = date.detail.value.substring(0, 10);
  }

  // Listener for date change
  endTimeChanged(date) {
    this.endTime = date.detail.value.substring(10, 25);
  }

  // Submit for add
  onSubmit(form: NgForm) {
    this.eventStart = new Date(this.startDate + this.startTime);
    this.eventEnd = new Date(this.endDate + this.endTime);

    if (!this.datesValid()) {
      this.presentAlert();
      return;
    }

    this.calendarEvent.title = form.value.title;
    this.calendarEvent.location = form.value.location;
    this.calendarEvent.startTime = this.eventStart.toISOString();
    this.calendarEvent.endTime = this.eventEnd.toISOString();

    this.addService.addEvent(this.calendarEvent);
  }

  // Method to validate date input
  datesValid() {
    return this.eventEnd > this.eventStart;
  }

  // Alert for invalid date input
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Input',
      message: 'End date cannot be before start date',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {}
}
