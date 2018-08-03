import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LastfmService } from '../../services/lastfm/lastfm.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private lastfmService: LastfmService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.lastfmService.authenticate(params['token']).then(data => {
        localStorage.setItem('key', data.session.key);
        localStorage.setItem('name', data.session.name);
        this.lastfmService.onAuth.next();
        this.router.navigate(['/home']);
      });
    });
  }
}
