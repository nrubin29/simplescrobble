import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {BackendService} from '../../services/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolve implements Resolve<Playlist> {

  constructor(private backendService: BackendService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Playlist> {
    return this.backendService.getPlaylist(route.params.id);
  }
}
