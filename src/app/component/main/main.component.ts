import { Component, OnInit } from '@angular/core';
import {MessagingService} from '../../service/messaging.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  message;
  token;

  constructor(private messagingService: MessagingService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    if (localStorage.getItem('username') === null || localStorage.getItem('friendToken') === null
    ) {
      this.router.navigate(['/setup']);
    }
  }

  openSnackBar() {
    this.snackBar.open('Sent', '', {
      duration: 2000,
    });
  }

  setup() {
    this.router.navigate(['/setup']);
  }

  sendMessage(msg: string) {
    this.messagingService.sendNotification(msg, localStorage.getItem('friendToken'), localStorage.getItem('username'));
    this.openSnackBar();
  }

  copyTokenToClipBoard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = localStorage.getItem('token');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
