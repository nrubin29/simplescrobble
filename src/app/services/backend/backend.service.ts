import { Injectable } from '@angular/core';
import {LastfmService} from '../lastfm/lastfm.service';
import {SpotifyService} from '../spotify/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements MusicService {
  service: 'lastfm' | 'spotify';

  constructor(private lastfmService: LastfmService, private spotifyService: SpotifyService) {
    this.service = 'lastfm';
  }

  get activeService() {
    if (this.service === 'lastfm') {
      return this.lastfmService;
    }

    else if (this.service === 'spotify') {
      return this.spotifyService;
    }
  }

  getAlbum(artist: string, name: string): Promise<Album> {
    return this.activeService.getAlbum(artist, name);
  }

  getArtist(name: string): Promise<Artist> {
    return this.activeService.getArtist(name);
  }

  getUserInfo(): Promise<User> {
    return this.activeService.getUserInfo();
  }

  search(type: 'track' | 'artist' | 'album', q: string, limit: number, page: number): Promise<SearchResult<Searchable>> {
    if (type === 'track') {
      return this.searchTracks(q, limit, page);
    }

    else if (type === 'album') {
      return this.searchAlbums(q, limit, page);
    }

    else if (type === 'artist') {
      return this.searchArtists(q, limit, page);
    }
  }

  searchAlbums(q: string, limit: number, page: number): Promise<SearchResult<Album>> {
    return this.activeService.searchAlbums(q, limit, page);
  }

  searchArtists(q: string, limit: number, page: number): Promise<SearchResult<Artist>> {
    return this.activeService.searchArtists(q, limit, page);
  }

  searchTracks(q: string, limit: number, page: number): Promise<SearchResult<Track>> {
    return this.activeService.searchTracks(q, limit, page);
  }
}
