import { TestBed, inject } from '@angular/core/testing';

import { AlbumResolve } from './album.resolve';

describe('AlbumResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumResolve]
    });
  });

  it('should be created', inject([AlbumResolve], (service: AlbumResolve) => {
    expect(service).toBeTruthy();
  }));
});
