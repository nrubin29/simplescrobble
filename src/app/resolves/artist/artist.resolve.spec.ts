import { TestBed, inject } from '@angular/core/testing';

import { ArtistResolve } from './artist.resolve';

describe('ArtistResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistResolve]
    });
  });

  it('should be created', inject([ArtistResolve], (service: ArtistResolve) => {
    expect(service).toBeTruthy();
  }));
});
