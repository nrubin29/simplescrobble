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
  width?: number;
}

interface Track {
  type: 'track';
  name: string;
  id: string;
  artist: Artist;
  album: Album;
  /** Duration in seconds. */
  duration: number;
}

interface Album {
  type: 'album';
  name: string;
  id: string;
  artist: string;
  artistId: string;
  images: Image[];
  tracks?: Track[]; // TODO: Maybe this should be a separate interface?
}

interface Artist {
  type: 'artist';
  name: string;
  id: string;
  images: Image[];
  albums?: Album[]; // TODO: Maybe this should be a separate interface?
}

interface User {
  type: 'user';
  name: string;
  images: Image[];
}
