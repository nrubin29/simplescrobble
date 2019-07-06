type Entity = Track | Album | Artist | User;
type Searchable = Track | Album | Artist;

interface PaginatedData<T extends Searchable> {
  [page: number]: T[];
}

interface SearchResult<T extends Searchable> {
  count: number;
  results: T[];
}

interface Image {
  url: string;
}

interface Track {
  type: 'track';
  name: string;
  artist: Artist;
  album: Album;
}

interface Album {
  type: 'album';
  name: string;
  artist: string;
  images: Image[];
  tracks?: Track[]; // TODO: Maybe this should be a separate interface?
}

interface Artist {
  type: 'artist';
  name: string;
  images: Image[];
  albums?: Album[]; // TODO: Maybe this should be a separate interface?
}

interface User {
  type: 'user';
  name: string;
  images: Image[];
}
