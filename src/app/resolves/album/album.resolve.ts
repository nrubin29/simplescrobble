import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LastfmService } from '../../services/lastfm/lastfm.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolve implements Resolve<Album> {

  constructor(private lastfmService: LastfmService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Album> {
    return this.lastfmService.getAlbum(route.params.artist, route.params.name);
  }
}
