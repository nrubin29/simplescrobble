interface LAlbumMatch {
  type: 'album';
  name: string;
  artist: string | LArtistMatch;
  url: string;
  mbid: string;
  image?: LImage[];
}

interface LAlbum extends LAlbumMatch {
  id?: string;
  artist: string;
  playcount: string;
  tracks: {
    track: LTrackMatch[]
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

interface LAlbumSearchResponse {
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
      album: LAlbumMatch[];
    };
  };
}

interface LAlbumInfoResponse {
  album: LAlbum;
}
