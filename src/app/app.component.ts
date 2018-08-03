import { Component, OnInit } from '@angular/core';
import { LastfmService } from './services/lastfm/lastfm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private lastfmService: LastfmService, private router: Router) {}

  ngOnInit() {
    this.lastfmService.onAuth.subscribe(() => {
      this.lastfmService.getUserInfo().then(response => this.user = response.user).catch(() => { this.user = undefined });
    });
    this.lastfmService.onAuth.next();
  }

  logOut() {
    localStorage.removeItem('key');
    localStorage.removeItem('name');
    this.lastfmService.onAuth.next();
    this.router.navigate(['/']);
  }
}
