import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistResolve implements Resolve<Artist> {
  constructor(private backendService: BackendService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Artist> {
    return this.backendService.getArtist(route.params.id);
  }
}
