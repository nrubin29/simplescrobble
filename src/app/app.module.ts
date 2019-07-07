import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule, MatDialogModule, MatGridListModule, MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
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
import {ChunkPipe} from './pipes/chunk.pipe';
import { SpotifyComponent } from './views/spotify/spotify.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MultiScrobbleComponent} from './components/multi-scrobble/multi-scrobble.component';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LastfmEffects} from './services/lastfm/lastfm.effects';
import {State} from './state';

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
    SpotifyComponent
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
    StoreModule.forRoot<State>({router: routerReducer}),
    EffectsModule.forRoot([LastfmEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  entryComponents: [
    ScrobbleComponent,
    MultiScrobbleComponent
  ],
  providers: [
    ChunkPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
