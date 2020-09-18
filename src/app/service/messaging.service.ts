import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
  url = 'https://fcm.googleapis.com/fcm/send';

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (messaging) => {
        messaging.onMessage = messaging.onMessage.bind(messaging);
        messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      }
    );
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('token', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }

  public async sendNotification(message: string, token: string, person: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          // tslint:disable-next-line:max-line-length
          Authorization: 'key=AAAA68OPjtw:APA91bGxxVT0MAH3WzQCfWVe2a5ShP54Mghr7Ki94Fpo01dcnOGmPwk1p9LOenW3FSc0fvWa-dAHi1bOPmgc7eq1nocq1gPm6G3w845OCVmk_0yPwVZukPwnJ2rAaZgtfa_LAqdJ3v2v'
        },
        body: JSON.stringify({
          notification: {
            title: person + ' wants attention!',
            body: message
          },
          // tslint:disable-next-line:max-line-length
          to : token
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject();
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

}
