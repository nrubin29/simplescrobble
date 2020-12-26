import { Component, OnInit } from '@angular/core';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScrobbleComponent } from '../scrobble/scrobble.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private lastfmService: LastfmService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.lastfmService.onAuth.subscribe(() => {
      this.lastfmService
        .getUserInfo()
        .then(response => (this.user = response))
        .catch(() => {
          this.user = undefined;
        });
    });
    this.lastfmService.onAuth.next();
  }

  manualScrobble() {
    this.matDialog.open(ScrobbleComponent, { data: {} });
  }

  logOut() {
    localStorage.removeItem('key');
    localStorage.removeItem('name');
    this.lastfmService.onAuth.next();
    this.router.navigate(['/']);
  }
}
