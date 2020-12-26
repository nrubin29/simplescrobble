import { TestBed, async, inject } from '@angular/core/testing';

import { RequireNoTokenGuard } from './require-no-token.guard';

describe('RequireNoTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireNoTokenGuard],
    });
  });

  it('should ...', inject(
    [RequireNoTokenGuard],
    (guard: RequireNoTokenGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
