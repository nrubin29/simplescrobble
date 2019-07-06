interface LArtistMatch {
  type: 'artist';
  name: string;
  url: string;
  streamable: '0' | '1';
  mbid: string;
  image?: LImage[];
}

interface LArtist extends LArtistMatch {
  id?: string;
  albums: LAlbumMatch[];
  stats: {
    listeners: string;
    playcount: string;
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
    links: {
      '#text': string;
      href: string;
      rel: string;
    }[]
  };
}

interface LArtistSearchResponse {
  results: {
    '@attr': {
      for: string
    }
    opensearch: {
      '#text': string;
      role: 'request';
      startPage: string;
    };
    'opensearch:itemsPerPage': string;
    'opensearch:startIndex': string;
    'opensearch:totalResults': string;
    artistmatches: {
      artist: LArtistMatch[];
    };
  };
}

interface LArtistInfoResponse {
  artist: LArtist;
}

interface TopAlbumsResponse {
  topalbums: {
    '@attr': {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
    album: LAlbumMatch[];
  };
}
