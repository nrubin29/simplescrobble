interface AlbumMatch {
  name: string;
  artist: string | any;
  url: string;
  mbid: string;
  image?: Images;
}

interface Album extends AlbumMatch {
  type: 'album';
  id?: string;
  artist: string;
  playcount: string;
  tracks: {
    track: TrackMatch[]
  };
  tags: {
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

interface AlbumSearchResponse {
  results: {
    '@attr': {
      for: string
    }
    'opensearch:Query': {
      '#text': string;
      role: 'request';
      searchTerms: string;
      startPage: string;
    };
    'opensearch:itemsPerPage': string;
    'opensearch:startIndex': string;
    'opensearch:totalResults': string;
    albummatches: {
      album: AlbumMatch[];
    };
  };
}

interface AlbumInfoResponse {
  album: Album;
}
