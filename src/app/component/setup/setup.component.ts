import { Component, OnInit } from '@angular/core';
import {MessagingService} from '../../service/messaging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  friendToken;
  username;

  constructor(private messagingService: MessagingService, private router: Router) { }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.username = localStorage.getItem('username');
    this.friendToken = localStorage.getItem('friendToken');
  }

  save(): void {
    if (this.username !== '' && this.username !== undefined && this.friendToken !== '' && this.friendToken !== undefined) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('friendToken', this.friendToken);
      this.router.navigate(['/']);
    } else {
      alert('Please enter a username and friend token.');
    }
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
