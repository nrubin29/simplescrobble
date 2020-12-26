import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;
import PagingObject = SpotifyApi.PagingObject;
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified;
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified;

export default class SpotifyTransform {
  static transformAlbum(
    album: AlbumObjectSimplified,
    tracks?: PagingObject<TrackObjectSimplified>
  ): Album {
    // The artist property exists but the typedef is wrong.
    const albumTyped = album as AlbumObjectSimplified & {
      artists: ArtistObjectSimplified[];
    };
    return {
      type: 'album',
      name: album.name,
      id: album.id,
      artist: albumTyped.artists.map(artist => artist.name).join(', '),
      artistId: albumTyped.artists[0].id,
      images: album.images,
      tracks: tracks
        ? tracks.items.map(track =>
            SpotifyTransform.transformSimpleTrack(track, album)
          )
        : [],
    };
  }

  static transformArtist(
    artist: ArtistObjectFull,
    albums?: PagingObject<AlbumObjectSimplified>
  ): Artist {
    return {
      type: 'artist',
      name: artist.name,
      id: artist.id,
      images: artist.images,
      albums: albums
        ? albums.items.map(album => SpotifyTransform.transformAlbum(album))
        : [],
    };
  }

  static transformSimpleTrack(
    track: TrackObjectSimplified,
    album: AlbumObjectSimplified
  ): Track {
    return {
      type: 'track',
      name: track.name,
      id: track.id,
      artist: {
        type: 'artist',
        name: track.artists[0].name,
        id: track.artists[0].id,
        images: undefined,
      },
      album: {
        type: 'album',
        name: album.name,
        id: album.id,
        artist: track.artists[0].name,
        artistId: track.artists[0].id,
        images: album.images,
      },
      duration: track.duration_ms / 1000,
    };
  }

  static transformTrack(track: TrackObjectFull): Track {
    return {
      type: 'track',
      name: track.name,
      id: track.id,
      artist: {
        type: 'artist',
        name: track.artists[0].name,
        id: track.artists[0].id,
        images: undefined,
      },
      album: {
        type: 'album',
        name: track.album.name,
        id: track.album.id,
        artist: track.artists[0].name,
        artistId: track.artists[0].id,
        images: track.album.images,
      },
      duration: track.duration_ms / 1000,
    };
  }

  static transformSimplePlaylist(playlist: PlaylistObjectSimplified): Playlist {
    return {
      type: 'playlist',
      name: playlist.name,
      id: playlist.id,
      images: playlist.images,
    };
  }

  static transformPlaylist(playlist: PlaylistObjectFull): Playlist {
    return {
      type: 'playlist',
      name: playlist.name,
      id: playlist.id,
      images: playlist.images,
      tracks: playlist.tracks.items
        .filter(track => track.track.type === 'track')
        .map(track =>
          SpotifyTransform.transformTrack(track.track as TrackObjectFull)
        ),
    };
  }

  static transformUser(user: UserObjectPrivate): User {
    return {
      type: 'user',
      name: user.display_name,
      images: user.images,
    };
  }
}
