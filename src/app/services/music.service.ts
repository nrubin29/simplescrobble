export interface MusicService {
    // search(type: 'track' | 'artist' | 'album', q: string, limit: number, page: number): Promise<SearchResult<Searchable>>;
    searchTracks(q: string, limit: number, page: number): Promise<SearchResult<Track>>;
    searchAlbums(q: string, limit: number, page: number): Promise<SearchResult<Album>>;
    searchArtists(q: string, limit: number, page: number): Promise<SearchResult<Artist>>;
    getArtist(name: string): Promise<Artist>;
    getAlbum(artist: string, name: string): Promise<Album>;
    getUserInfo(): Promise<User>;
}
