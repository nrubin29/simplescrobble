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

  async search(q: string, limit: number, page: number): Promise<SearchedTracks> {
    const trackMatches = await this.httpClient.get<TrackSearchResponse>(this.buildURL('track.search', {track: q, limit: limit.toString(), page: page.toString()}, ['track'])).toPromise();
    const tracks: Track[] = [];

    for (const trackMatch of trackMatches.results.trackmatches.track) {
      tracks.push((await this.httpClient.get<TrackInfoResponse>(this.buildURL('track.getInfo', trackMatch.mbid ? {mbid: trackMatch.mbid} : {track: trackMatch.name, artist: trackMatch.artist}, ['track', 'artist'])).toPromise()).track);
    }

    return {
      tracks: tracks,
      count: +trackMatches.results['opensearch:totalResults']
    };
  }

  getUserInfo(): Promise<UserResponse> {
    return localStorage.getItem('name') ? this.httpClient.get<UserResponse>(this.buildURL('user.getInfo', {user: localStorage.getItem('name')})).toPromise() : Promise.reject('');
  }
}

export interface SimpleTrack {
  album: string;
  artist: string;
  song: string;
}
