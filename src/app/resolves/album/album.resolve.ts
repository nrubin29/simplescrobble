import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {BackendService} from '../../services/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolve implements Resolve<Album> {

  constructor(private backendService: BackendService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Album> {
    return this.backendService.getAlbum(route.params.artistId, route.params.id);
  }
}
