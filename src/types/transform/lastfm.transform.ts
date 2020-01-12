import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export default class LastfmTransform {
    static LImageSizeToWidth = {
      'small': 0,
      'medium': 1,
      'large': 2,
      'extralarge': 3
    };

    static transformAlbum(album: LAlbumMatch): Album {
        const ret: Album = {
            type: 'album',
            name: album.name,
            id: album.name,
            artist: typeof album.artist === 'string' ? album.artist : album.artist.name,
            artistId: typeof album.artist === 'string' ? album.artist : album.artist.name,
            images: album.image ? album.image.map(image => ({url: image['#text'], width: LastfmTransform.LImageSizeToWidth[image.size]})) : []
        };

        if ((<any>album).tracks !== undefined) {
            ret['tracks'] = (<any>album).tracks.track.map(track => LastfmTransform.transformTrack(track));
        }

        return ret;
    }

    static transformArtist(artist: LArtistMatch, albums?: LAlbumMatch[]): Artist {
        return {
            type: 'artist',
            name: artist.name,
            id: artist.name,
            images: artist.image ? artist.image.map(image => ({url: image['#text'], width: LastfmTransform.LImageSizeToWidth[image.size]})) : [],
            albums: albums ? albums.map(album => LastfmTransform.transformAlbum(album)) : undefined
        };
    }

    static transformTrack(track: LTrack): Track {
        return {
            type: 'track',
            name: track.name,
            id: track.name,
            artist: {
                type: 'artist',
                name: track.artist ? track.artist.name : '',
                id: track.artist ? track.artist.name : '',
                images: undefined
            },
            album: {
                type: 'album',
                name: track.album ? track.album.title : '',
                id: track.album ? track.album.title : '',
                artist: track.artist ? track.artist.name : '',
                artistId: track.artist ? track.artist.name : '',
                images: track.album ? track.album.image.map(image => ({url: image['#text'], width: LastfmTransform.LImageSizeToWidth[image.size]})) : []
            },
            duration: Number(track.duration)
        };
    }

    static transformUser(user: LUser): User {
        return {
            type: 'user',
            name: user.name,
            images: user.image.map(image => ({url: image['#text'], width: LastfmTransform.LImageSizeToWidth[image.size]}))
        };
    }
}
