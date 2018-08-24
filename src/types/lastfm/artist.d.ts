interface ArtistMatch {
  name: string;
  url: string;
  streamable: '0' | '1';
  mbid: string;
  image?: Images;
}

interface Artist extends ArtistMatch {
  type: 'artist';
  id?: string;
  albums: AlbumMatch[];
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

interface ArtistSearchResponse {
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
      artist: ArtistMatch[];
    };
  };
}

interface ArtistInfoResponse {
  artist: Artist;
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
    album: AlbumMatch[];
  };
}