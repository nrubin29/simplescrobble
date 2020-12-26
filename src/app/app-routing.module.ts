import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CallbackComponent } from './views/callback/callback.component';
import { SearchComponent } from './views/search/search.component';
import { RequireTokenGuard } from './guards/require-token/require-token.guard';
import { RequireNoTokenGuard } from './guards/require-no-token/require-no-token.guard';
import { ArtistComponent } from './views/artist/artist.component';
import { ArtistResolve } from './resolves/artist/artist.resolve';
import { AlbumResolve } from './resolves/album/album.resolve';
import { AlbumComponent } from './views/album/album.component';
import { SpotifyComponent } from './views/spotify/spotify.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { PlaylistResolve } from './resolves/playlist/playlist.resolve';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RequireNoTokenGuard],
  },
  {
    path: 'callback',
    component: CallbackComponent,
    canActivate: [RequireNoTokenGuard],
  },
  {
    path: 'spotify',
    component: SpotifyComponent,
    canActivate: [RequireTokenGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [RequireTokenGuard],
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    resolve: { artist: ArtistResolve },
  },
  {
    path: 'album/:artistId/:id',
    component: AlbumComponent,
    resolve: { album: AlbumResolve },
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent,
    resolve: { playlist: PlaylistResolve },
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
