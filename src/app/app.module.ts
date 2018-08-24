import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { ScrobbleComponent } from './views/scrobble/scrobble.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { CallbackComponent } from './views/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './views/search/search.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HomeComponent } from './views/home/home.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ArtistComponent } from './views/artist/artist.component';
import { AlbumComponent } from './views/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrobbleComponent,
    LoginComponent,
    CallbackComponent,
    SearchComponent,
    HomeComponent,
    ListViewComponent,
    GridViewComponent,
    ArtistComponent,
    AlbumComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
