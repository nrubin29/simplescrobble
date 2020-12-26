import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss'],
})
export class SpotifyComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      const data = new URLSearchParams(fragment);
      this.spotifyService.setToken(
        data.get('access_token'),
        parseInt(data.get('expires_in'), 10)
      );
      this.backendService.service = 'spotify';
      this.router.navigate(['/']);
    });
  }
}
