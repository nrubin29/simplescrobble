export interface MusicService {
  // search(type: 'track' | 'artist' | 'album', q: string, limit: number, page: number): Promise<SearchResult<Searchable>>;
  searchTracks(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Track>>;
  searchAlbums(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Album>>;
  searchArtists(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Artist>>;
  searchPlaylists?(
    q: string,
    limit: number,
    page: number
  ): Promise<SearchResult<Playlist>>;
  getArtist(name: string): Promise<Artist>;
  getAlbum(artist: string, name: string): Promise<Album>;
  getPlaylist?(id: string): Promise<Playlist>;
  getUserInfo(): Promise<User>;
}
