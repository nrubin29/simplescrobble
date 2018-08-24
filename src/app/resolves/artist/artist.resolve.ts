import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LastfmService } from '../../services/lastfm/lastfm.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolve implements Resolve<Artist> {

  constructor(private lastfmService: LastfmService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Artist> {
    return this.lastfmService.getArtist(route.params.name);
  }
}
