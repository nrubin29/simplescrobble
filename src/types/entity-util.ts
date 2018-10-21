export class EntityUtil {
  static getImage(entity: Entity | Searchable, quality: 'worst' | 'best') {
    let image: Images;

    if (entity.type === 'song') {
      image = entity.album ? entity.album.image : undefined;
    }

    else {
      image = entity.image;
    }

    return image ? image[quality === 'best' ? image.length - 1 : 0]['#text'] : '';
  }

  static getDescriptor(searchable: Searchable) {
    if (searchable.type === 'song') {
      return searchable.artist.name;
    }

    else if (searchable.type === 'album') {
      return searchable.artist;
    }
  }
}
