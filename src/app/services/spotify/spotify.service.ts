import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { environment } from '../../../environments/environment';
import SpotifyTransform from '../../../types/transform/spotify.transform';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements MusicService {
  private spotify: SpotifyWebApi.SpotifyWebApiJs;

  constructor() {
    this.spotify = new SpotifyWebApi();

    if (this.accessToken) {
      this.spotify.setAccessToken(this.accessToken);
    }
  }

  authenticate() {
    const args = {
      'client_id': environment.spotifyClientID,
      'response_type': 'token',
      'redirect_uri': encodeURIComponent(environment.baseUrl) + '/spotify',
      // TODO: state
    };

    location.href = 'https://accounts.spotify.com/authorize?' + Object.keys(args).map(key => key + '=' + args[key]).join('&');
  }

  get accessToken() {
    return localStorage.getItem('spotify_access_token');
  }


  get expires() {
    return new Date(parseInt(localStorage.getItem('spotify_expires'), 10));
  }

  isAuthenticated() {
    return localStorage.getItem('spotify_access_token') && new Date().getTime() < this.expires.getTime();
  }

  setToken(token: string, expiresIn: number) {
    this.spotify.setAccessToken(token);
    localStorage.setItem('spotify_access_token', token);
    localStorage.setItem('spotify_expires', new Date().setSeconds(new Date().getSeconds() + expiresIn).toString());
  }

  async getAlbum(artist: string, name: string): Promise<Album> {
    return SpotifyTransform.transformAlbum(await this.spotify.getAlbum(name)); // TODO: This should be the album's ID.
  }

  async getArtist(name: string): Promise<Artist> {
    return SpotifyTransform.transformArtist(await this.spotify.getArtist(name)); // TODO: This should be the artist's ID.
  }

  async getUserInfo(): Promise<User> {
    return undefined; // TODO: Implement this (maybe).
  }

  async searchAlbums(q: string, limit: number, page: number): Promise<SearchResult<Album>> {
    const results = await this.spotify.searchAlbums(q); // , {limit: limit, offset: page});
    return {
      count: results.albums.total,
      results: results.albums.items.map((album: any) => SpotifyTransform.transformAlbum(album))
    };
  }

  async searchArtists(q: string, limit: number, page: number): Promise<SearchResult<Artist>> {
    const results = await this.spotify.searchArtists(q); // , {limit: limit, offset: page});
    return {
      count: results.artists.total,
      results: results.artists.items.map(artist => SpotifyTransform.transformArtist(artist))
    };
  }

  async searchTracks(q: string, limit: number, page: number): Promise<SearchResult<Track>> {
    const results = await this.spotify.searchTracks(q); // , {limit: limit, offset: page});
    return {
      count: results.tracks.total,
      results: results.tracks.items.map(track => SpotifyTransform.transformTrack(track))
    };
  }
}
