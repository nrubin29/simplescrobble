export class EntityUtil {
  static getImage(entity: Entity, quality: 'worst' | 'best') {
    if (entity.type === 'song') {
      return entity.album ? entity.album.image[quality === 'best' ? entity.album.image.length - 1 : 0]['#text'] : '';
    }

    else if (entity.type === 'album' || entity.type === 'artist') {
      return entity.image ? entity.image[quality === 'best' ? entity.image.length - 1 : 0]['#text'] : '';
    }
  }

  static getDescriptor(entity: Entity) {
    if (entity.type === 'song') {
      return entity.artist.name;
    }

    else if (entity.type === 'album') {
      return entity.artist;
    }
  }
}
