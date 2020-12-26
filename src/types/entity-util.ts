export class EntityUtil {
  static getImage(
    entity: Entity | Searchable,
    quality: 'worst' | 'best'
  ): string {
    let images: Image[];

    if (entity.type === 'track') {
      images = entity.album ? entity.album.images : undefined;
    } else {
      images = entity.images;
    }

    return images && images.length > 0
      ? images.sort((a, b) => (a.width || 0) - (b.width || 0))[
          quality === 'best' ? images.length - 1 : 0
        ].url
      : '';
  }

  static getDescriptor(searchable: Searchable): string {
    if (searchable.type === 'track') {
      return searchable.artist.name;
    } else if (searchable.type === 'album') {
      return searchable.artist;
    }
  }
}
