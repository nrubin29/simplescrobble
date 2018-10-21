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

@NgModule({
  declarations: [
    AppComponent,
    ScrobbleComponent,
    LoginComponent,
    CallbackComponent,
    SearchComponent,
    ListViewComponent,
    GridViewComponent,
    ArtistComponent,
    AlbumComponent,
    HeaderComponent,
    ChunkPipe
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
    MatDialogModule
  ],
  entryComponents: [
    ScrobbleComponent
  ],
  providers: [
    ChunkPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
