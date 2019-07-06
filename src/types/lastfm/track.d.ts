interface LTrackMatch {
  type: 'song';
  name: string;
  artist: string | any;
  url: string;
  streamable: {
    '#text': '0' | '1';
    fulltrack: '0' | '1';
  };
  listeners: string;
  mbid: string;
  image?: LImage[];
}

interface LTrack extends LTrackMatch {
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
    image: LImage[];
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

interface LTrackSearchResponse {
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
      track: LTrackMatch[];
    };
  };
}

interface LTrackInfoResponse {
  track: LTrack;
}
