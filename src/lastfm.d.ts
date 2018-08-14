type Images = {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
}[];

interface TrackMatch {
  name: string;
  artist: string | any;
  url: string;
  streamable: {
    '#text': '0' | '1';
    fulltrack: '0' | '1';
  };
  listeners: string;
  mbid: string;
  image?: Images;
}

interface Track extends TrackMatch {
  id?: string;
  duration: string;
  playcount: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    artist: string;
    title: string;
    mbid: string;
    url: string;
    image: Images;
    '@attr': {
      'position': string;
    };
  };
  toptags: {
    tag: {
      name: string;
      url: string;
    }[];
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
  };
}

interface User {
  id: string;
  name: string;
  realname: string;
  url: string;
  image: Images;
  country: string;
  age: string;
  gender: 'm' | 'f';
  subscriber: '0' | '1';
  playcount: string;
  playlists: string;
  bootstrap: string;
  registered: {
    unixtime: string;
    '#text': string;
  };
}

interface TrackSearchResponse {
  results: {
    opensearch: {
      '#text': string;
      role: 'request';
      startPage: string;
    };
    'opensearch:itemsPerPage': string;
    'opensearch:startIndex': string;
    'opensearch:totalResults': string;
    trackmatches: {
      track: TrackMatch[];
    };
  };
}

interface SearchedTracks {
  tracks: Track[];
  count: number;
}

interface TrackInfoResponse {
  track: Track;
}

interface AuthenticationResponse {
  session: {
    name: string;
    key: string;
  };
}

interface CorrectedObject {
  corrected: '0' | '1';
  '#text': string;
}

interface ScrobbleResponse {
  scrobbles: {
    '@attr': {
      accepted: number;
      ignored: number;
    };
    scrobble: {
      album: CorrectedObject;
      albumArtist: CorrectedObject;
      artist: CorrectedObject;
      ignoredMessage: {
        code: string;
        '#text': string;
      };
      timestamp: string;
      track: CorrectedObject;
    };
  };
}

interface UserResponse {
  user: User;
}
