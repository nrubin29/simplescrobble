import { Injectable } from '@angular/core';
import * as md5 from 'md5';
import env from '../../../../env';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import LastfmTransform from '../../../types/transform/lastfm.transform';
import { MusicService } from '../music.service';

@Injectable({
  providedIn: 'root',
})
export class LastfmService implements MusicService {
  private base = 'https://ws.audioscrobbler.com/2.0/';
  onAuth: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.onAuth = new Subject();
  }

  private encode(str: string) {
    return encodeURIComponent(str).replace(/%20/g, '+');
  }

  private buildURL(
    method: string,
    data: { [key: string]: string } = {},
    encode: string[] = []
  ) {
    const allHashData = Object.assign({}, data, {
      api_key: env.apiKey,
      method: method,
    });
    const hash =
      Object.keys(allHashData)
        .sort()
        .map(key => key + allHashData[key])
        .join('') + env.apiSecret;
    const signature = md5(hash);
    const allUrlData = Object.assign({}, allHashData, { api_sig: signature });
    return (
      this.base +
      '?format=json&' +
      Object.keys(allUrlData)
        .sort()
        .map(
          key =>
            key +
            '=' +
            (encode.indexOf(key.replace(/\[\d+]/g, '')) !== -1
              ? this.encode(allUrlData[key])
              : allUrlData[key])
        )
        .join('&')
    );
  }

  authenticate(token: string): Promise<LAuthenticationResponse> {
    return this.httpClient
      .get<LAuthenticationResponse>(
        this.buildURL('auth.getSession', { token: token })
      )
      .toPromise();
  }

  scrobble(
    input: SimpleTrack[],
    timestamp: number[]
  ): Promise<ScrobbleResponse> {
    const data = {};

    for (let i = 0; i < input.length; i++) {
      data[`album[${i + 1}]`] = input[i].album;
      data[`artist[${i + 1}]`] = input[i].artist;
      data[`track[${i + 1}]`] = input[i].name;
      data[`timestamp[${i + 1}]`] = timestamp[i];
    }

    return this.httpClient
      .post<ScrobbleResponse>(
        this.buildURL(
          'track.scrobble',
          {
            ...data,
            sk: localStorage.getItem('key'),
            timestamp: timestamp.toString(),
          },
          ['album', 'artist', 'track']
        ),
        null
      )
      .toPromise();
  }

  async searchTracks(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Track>> {
    const trackMatches = await this.httpClient
      .get<LTrackSearchResponse>(
        this.buildURL(
          'track.search',
          { track: q, limit: limit.toString(), page: page.toString() },
          ['track']
        )
      )
      .toPromise();
    const tracks: Track[] = [];

    for (const trackMatch of trackMatches.results.trackmatches.track) {
      const track = (
        await this.httpClient
          .get<LTrackInfoResponse>(
            this.buildURL(
              'track.getInfo',
              trackMatch.mbid
                ? { mbid: trackMatch.mbid }
                : { track: trackMatch.name, artist: trackMatch.artist },
              ['track', 'artist']
            )
          )
          .toPromise()
      ).track;
      tracks.push(LastfmTransform.transformTrack(track));
    }

    return {
      count: +trackMatches.results['opensearch:totalResults'],
      results: tracks,
    };
  }

  async searchAlbums(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Album>> {
    const albumMatches = await this.httpClient
      .get<LAlbumSearchResponse>(
        this.buildURL(
          'album.search',
          { album: q, limit: limit.toString(), page: page.toString() },
          ['album']
        )
      )
      .toPromise();

    return {
      count: +albumMatches.results['opensearch:totalResults'],
      results: albumMatches.results.albummatches.album.map(albumMatch =>
        LastfmTransform.transformAlbum(albumMatch)
      ),
    };
  }

  async searchArtists(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Artist>> {
    const artistMatches = await this.httpClient
      .get<LArtistSearchResponse>(
        this.buildURL(
          'artist.search',
          { artist: q, limit: limit.toString(), page: page.toString() },
          ['artist']
        )
      )
      .toPromise();

    return {
      count: +artistMatches.results['opensearch:totalResults'],
      results: artistMatches.results.artistmatches.artist.map(artistMatch =>
        LastfmTransform.transformArtist(artistMatch)
      ),
    };
  }

  async getArtist(id: string): Promise<Artist> {
    const artistInfo = await this.httpClient
      .get<LArtistInfoResponse>(
        this.buildURL('artist.getInfo', { artist: id }, ['artist'])
      )
      .toPromise();
    const topAlbumInfo = await this.httpClient
      .get<TopAlbumsResponse>(
        this.buildURL('artist.getTopAlbums', { artist: id }, ['artist'])
      )
      .toPromise();
    return LastfmTransform.transformArtist(
      artistInfo.artist,
      topAlbumInfo.topalbums.album
    );
  }

  async getAlbum(artistId: string, id: string): Promise<Album> {
    const albumInfo = await this.httpClient
      .get<LAlbumInfoResponse>(
        this.buildURL('album.getInfo', { artist: artistId, album: id })
      )
      .toPromise();
    return LastfmTransform.transformAlbum(albumInfo.album);
  }

  async getUserInfo(): Promise<User> {
    if (localStorage.getItem('name')) {
      const userResponse = await this.httpClient
        .get<LUserResponse>(
          this.buildURL('user.getInfo', { user: localStorage.getItem('name') })
        )
        .toPromise();
      return LastfmTransform.transformUser(userResponse.user);
    }

    throw new Error('No user data.');
  }
}

export interface SimpleTrack {
  album: string;
  artist: string;
  name: string;
}
