import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Parse } from 'parse';

import { environment } from 'src/environments/environment';

Parse.serverURL = 'https://parseapi.back4app.com'; // Server URL
Parse.initialize(
  `${environment.ParseServerApplicationID}`, // Application ID
  `${environment.ParseServerJSKey}` // Javascript key
);

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss']
})
export class TodoPage implements OnInit {
  tasks = [];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const Todo = Parse.Object.extend('Todo');
    const query = new Parse.Query(Todo);
    query.equalTo('user', Parse.User.current());
    query.find().then(
      results => {
        results.map(data => {
          const event = {
            task: data.attributes.task,
            completed: false,
            id: data.id
          };
          this.tasks.push(event);
        });
      },
      error => {
        console.error('Error while fetching Todo', error);
      }
    );
  }

  createNewTask(task: string) {
    const Todo = Parse.Object.extend('Todo');
    const myNewObject = new Todo();

    myNewObject.set('task', task);
    myNewObject.set('user', Parse.User.current());

    myNewObject.save().then(
      result => {
        const newTask = {
          task: result.attributes.task,
          completed: false,
          id: result.id
        };
        this.tasks.push(newTask);
      },
      error => {
        console.log(error);
      }
    );
  }

  async addNewTask() {
    const alert = await this.alertCtrl.create({
      header: 'Add Task',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Task'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.createNewTask(data.task);
          }
        }
      ]
    });

    await alert.present();
  }

  onClick(id: any) {
    this.tasks = this.tasks.filter(value => {
      return value.id !== id;
    });
    const Todo = Parse.Object.extend('Todo');
    const query = new Parse.Query(Todo);
    // here you put the objectId that you want to delete
    query.get(id).then(object => {
      object.destroy().then(
        response => {},
        error => {
          console.error('Error while deleting Todo', error);
        }
      );
    });
  }
}
