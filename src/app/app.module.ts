import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrobbleComponent } from './components/scrobble/scrobble.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { CallbackComponent } from './views/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './views/search/search.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ListViewComponent } from './components/list-view/list-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ArtistComponent } from './views/artist/artist.component';
import { AlbumComponent } from './views/album/album.component';
import { HeaderComponent } from './components/header/header.component';
import { ChunkPipe } from './pipes/chunk.pipe';
import { SpotifyComponent } from './views/spotify/spotify.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MultiScrobbleComponent } from './components/multi-scrobble/multi-scrobble.component';
import { PlaylistComponent } from './views/playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrobbleComponent,
    MultiScrobbleComponent,
    LoginComponent,
    CallbackComponent,
    SearchComponent,
    ListViewComponent,
    GridViewComponent,
    ArtistComponent,
    AlbumComponent,
    HeaderComponent,
    ChunkPipe,
    SpotifyComponent,
    PlaylistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDialogModule,
    FontAwesomeModule,
  ],
  entryComponents: [ScrobbleComponent, MultiScrobbleComponent],
  providers: [ChunkPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
