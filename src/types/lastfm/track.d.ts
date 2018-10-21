interface TrackMatch {
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

interface TrackInfoResponse {
  track: Track;
}
