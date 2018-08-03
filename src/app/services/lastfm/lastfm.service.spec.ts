import { TestBed, inject } from '@angular/core/testing';

import { LastfmService } from './lastfm.service';

describe('LastfmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastfmService]
    });
  });

  it('should be created', inject([LastfmService], (service: LastfmService) => {
    expect(service).toBeTruthy();
  }));
});
