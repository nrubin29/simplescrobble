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
  error: string;

  constructor(
    private spotifyService: SpotifyService,
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(async queryParams => {
      if (queryParams.has('error')) {
        this.error = queryParams.get('error');
        return;
      }

      await this.spotifyService.getAccessToken(queryParams.get('code'));

      this.backendService.service.next('spotify');
      await this.router.navigate(['/']);
    });
  }
}
