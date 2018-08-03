import { TestBed, async, inject } from '@angular/core/testing';

import { RequireTokenGuard } from './require-token.guard';

describe('RequireTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireTokenGuard]
    });
  });

  it('should ...', inject([RequireTokenGuard], (guard: RequireTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
