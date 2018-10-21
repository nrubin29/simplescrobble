import { Injectable } from '@angular/core';
import * as md5 from 'md5';
import env from '../../../../env';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  private base = 'https://ws.audioscrobbler.com/2.0/';
  onAuth: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.onAuth = new Subject();
  }

  private encode(str: string) {
    return encodeURIComponent(str).replace(/%20/g, '+');
  }

  private buildURL(method: string, data: {[key: string]: string} = {}, encode: string[] = []) {
    const allHashData = Object.assign({}, data, {api_key: env.apiKey, method: method});
    const hash = Object.keys(allHashData).sort().map(key => key + allHashData[key]).join('') + env.apiSecret;
    const signature = md5(hash);
    const allUrlData = Object.assign({}, allHashData, {api_sig: signature});
    return this.base + '?format=json&' + Object.keys(allUrlData).sort().map(key => key + '=' + (encode.indexOf(key) !== -1 ? this.encode(allUrlData[key]) : allUrlData[key])).join('&');
  }

  authenticate(token: string): Promise<AuthenticationResponse> {
    return this.httpClient.get<AuthenticationResponse>(this.buildURL('auth.getSession', {token: token})).toPromise();
  }

  scrobble(input: SimpleTrack, timestamp: number): Promise<ScrobbleResponse> {
    return this.httpClient.post<ScrobbleResponse>(this.buildURL('track.scrobble', {
      album: input.album,
      artist: input.artist,
      sk: localStorage.getItem('key'),
      timestamp: timestamp.toString(),
      track: input.song
    }, ['album', 'artist', 'track']), null).toPromise();
  }

  search(type: 'song' | 'artist' | 'album', q: string, limit: number, page: number): Promise<SearchResult<Searchable>> {
    if (type === 'song') {
      return this.searchTracks(q, limit, page);
    }

    else if (type === 'album') {
      return this.searchAlbums(q, limit, page);
    }

    else if (type === 'artist') {
      return this.searchArtists(q, limit, page);
    }
  }

  async searchTracks(q: string, limit: number, page: number): Promise<SearchResult<Track>> {
    const trackMatches = await this.httpClient.get<TrackSearchResponse>(this.buildURL('track.search', {track: q, limit: limit.toString(), page: page.toString()}, ['track'])).toPromise();
    const tracks: Track[] = [];

    for (const trackMatch of trackMatches.results.trackmatches.track) {
      tracks.push({...(await this.httpClient.get<TrackInfoResponse>(this.buildURL('track.getInfo', trackMatch.mbid ? {mbid: trackMatch.mbid} : {track: trackMatch.name, artist: trackMatch.artist}, ['track', 'artist'])).toPromise()).track, type: 'song'});
    }

    return {
      count: +trackMatches.results['opensearch:totalResults'],
      results: tracks
    };
  }

  async searchAlbums(q: string, limit: number, page: number): Promise<SearchResult<AlbumMatch>> {
    const albumMatches = await this.httpClient.get<AlbumSearchResponse>(this.buildURL('album.search', {album: q, limit: limit.toString(), page: page.toString()}, ['album'])).toPromise();

    return {
      count: +albumMatches.results['opensearch:totalResults'],
      results: albumMatches.results.albummatches.album.map<AlbumMatch>(albumMatch => ({...albumMatch, type: 'album'}))
    };
  }

  async searchArtists(q: string, limit: number, page: number): Promise<SearchResult<ArtistMatch>> {
    const artistMatches = await this.httpClient.get<ArtistSearchResponse>(this.buildURL('artist.search', {artist: q, limit: limit.toString(), page: page.toString()}, ['artist'])).toPromise();

    return {
      count: +artistMatches.results['opensearch:totalResults'],
      results: artistMatches.results.artistmatches.artist.map<ArtistMatch>(artistMatch => ({...artistMatch, type: 'artist'}))
    };
  }

  async getArtist(name: string): Promise<Artist> {
    const artistInfo = await this.httpClient.get<ArtistInfoResponse>(this.buildURL('artist.getInfo', {artist: name}, ['artist'])).toPromise();
    const topAlbumInfo = await this.httpClient.get<TopAlbumsResponse>(this.buildURL('artist.getTopAlbums', {artist: name},['artist'])).toPromise();
    return {...artistInfo.artist, albums: topAlbumInfo.topalbums.album.map<AlbumMatch>(album => ({...album, type: 'album'})), type: 'artist'};
  }

  async getAlbum(artist: string, name: string): Promise<Album> {
    const albumInfo = await this.httpClient.get<AlbumInfoResponse>(this.buildURL('album.getInfo', {artist, album: name})).toPromise();
    return {...albumInfo.album, type: 'album'};
  }

  async getUserInfo(): Promise<UserResponse> {
    if (localStorage.getItem('name')) {
      const userResponse = await this.httpClient.get<UserResponse>(this.buildURL('user.getInfo', {user: localStorage.getItem('name')})).toPromise();
      userResponse.user = {...userResponse.user, type: 'user'};
      return userResponse;
    }

    throw new Error('No user data.');
  }
}

export interface SimpleTrack {
  album: string;
  artist: string;
  song: string;
}
