import { TestBed, inject } from '@angular/core/testing';

import { PlaylistResolve } from './playlist.resolve';

describe('PlaylistResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistResolve],
    });
  });

  it('should be created', inject(
    [PlaylistResolve],
    (service: PlaylistResolve) => {
      expect(service).toBeTruthy();
    }
  ));
});
