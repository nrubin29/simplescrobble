import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { environment } from '../../../environments/environment';
import SpotifyTransform from '../../../types/transform/spotify.transform';
import env from '../../../../env';
import { MusicService } from '../music.service';
import { create as createPkcePair } from 'pkce';
import { HttpClient, HttpParams } from '@angular/common/http';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService implements MusicService {
  private spotify: SpotifyWebApi.SpotifyWebApiJs;

  constructor(private httpClient: HttpClient) {
    this.spotify = new SpotifyWebApi();

    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
      this.spotify.setAccessToken(accessToken);
    }
  }

  /**
   * 1. Create the code verifier and challenge
   * 2. Construct the authorization URI
   * 3. Your app redirects the user to the authorization URI
   */
  authenticate() {
    const {
      codeVerifier,
      codeChallenge,
    }: { codeVerifier: string; codeChallenge: string } = createPkcePair();
    localStorage.setItem('code_verifier', codeVerifier);

    const args = {
      client_id: env.spotifyClientID,
      response_type: 'code',
      redirect_uri: environment.baseUrl + '/spotify',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      // TODO: state
    };

    const url = new URL('https://accounts.spotify.com/authorize');
    Object.entries(args).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    location.href = url.href;
  }

  /**
   * 4. Your app exchanges the code for an access token
   */
  async getAccessToken(code: string) {
    const payload = new HttpParams()
      .set('client_id', env.spotifyClientID)
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', environment.baseUrl + '/spotify')
      .set('code_verifier', localStorage.getItem('code_verifier'));

    const response = await this.httpClient
      .post<SpotifyTokenResponse>(
        'https://accounts.spotify.com/api/token',
        payload
      )
      .toPromise();

    this.handleTokenResponse(response);
  }

  handleTokenResponse(response: SpotifyTokenResponse) {
    this.spotify.setAccessToken(response.access_token);
    localStorage.setItem('spotify_access_token', response.access_token);
    localStorage.setItem('spotify_refresh_token', response.refresh_token);
    localStorage.setItem(
      'spotify_expires',
      new Date()
        .setSeconds(new Date().getSeconds() + response.expires_in)
        .toString()
    );
  }

  get expires() {
    return new Date(parseInt(localStorage.getItem('spotify_expires'), 10));
  }

  async isAuthenticated() {
    if (
      localStorage.getItem('spotify_access_token') &&
      new Date().getTime() < this.expires.getTime()
    ) {
      return true;
    }

    if (!localStorage.getItem('spotify_refresh_token')) {
      return false;
    }

    // 6. Requesting a refreshed access token
    const payload = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', localStorage.getItem('spotify_refresh_token'))
      .set('client_id', env.spotifyClientID);

    const response = await this.httpClient
      .post<SpotifyTokenResponse>(
        'https://accounts.spotify.com/api/token',
        payload
      )
      .toPromise();

    this.handleTokenResponse(response);
    return true;
  }

  async getAlbum(artistId: string, id: string): Promise<Album> {
    return SpotifyTransform.transformAlbum(
      await this.spotify.getAlbum(id),
      await this.spotify.getAlbumTracks(id, { limit: 50 })
    ); // TODO: Handle paging properly
  }

  async getArtist(id: string): Promise<Artist> {
    return SpotifyTransform.transformArtist(
      await this.spotify.getArtist(id),
      await this.spotify.getArtistAlbums(id, { limit: 50 })
    ); // TODO: Handle paging properly
  }

  async getPlaylist(id: string): Promise<Playlist> {
    return SpotifyTransform.transformPlaylist(
      await this.spotify.getPlaylist(id)
    ); // TODO: Handle paging properly
  }

  async getUserInfo(): Promise<User> {
    return undefined; // TODO: Implement this (maybe).
  }

  async searchAlbums(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Album>> {
    const results = await this.spotify.searchAlbums(q); // , {limit: limit, offset: page});
    return {
      count: results.albums.total,
      results: results.albums.items.map((album: any) =>
        SpotifyTransform.transformAlbum(album)
      ),
    };
  }

  async searchArtists(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Artist>> {
    const results = await this.spotify.searchArtists(q); // , {limit: limit, offset: page});
    return {
      count: results.artists.total,
      results: results.artists.items.map(artist =>
        SpotifyTransform.transformArtist(artist)
      ),
    };
  }

  async searchTracks(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Track>> {
    const results = await this.spotify.searchTracks(q); // , {limit: limit, offset: page});
    return {
      count: results.tracks.total,
      results: results.tracks.items.map(track =>
        SpotifyTransform.transformTrack(track)
      ),
    };
  }

  async searchPlaylists(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Playlist>> {
    const results = await this.spotify.searchPlaylists(q); // , {limit: limit, offset: page});
    return {
      count: results.playlists.total,
      results: results.playlists.items.map(playlist =>
        SpotifyTransform.transformSimplePlaylist(playlist)
      ),
    };
  }
}
