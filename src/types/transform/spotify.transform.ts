import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

export default class SpotifyTransform {
    static transformAlbum(album: AlbumObjectSimplified & {artists: ArtistObjectSimplified[]}): Album {
        return {
            type: 'album',
            name: album.name,
            artist: album.artists.map(artist => artist.name).join(', '), // TODO: this property exists, the typedef is wrong.
            images: album.images
        };
    }

    static transformArtist(artist: ArtistObjectFull): Artist {
        return {
            type: 'artist',
            name: artist.name,
            images: artist.images
        };
    }

    static transformTrack(track: TrackObjectFull): Track {
        return {
            type: 'track',
            name: track.name,
            artist: {
                type: 'artist',
                name: track.artists[0].name,
                images: undefined
            },
            album: {
                type: 'album',
                name: track.album.name,
                artist: track.artists[0].name,
                images: track.album.images
            },
            duration: track.duration_ms / 1000
        };
    }

    static transformUser(user: UserObjectPrivate): User {
        return {
            type: 'user',
            name: user.display_name,
            images: user.images
        };
    }
}
