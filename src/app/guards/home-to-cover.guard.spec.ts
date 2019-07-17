import { TestBed, async, inject } from '@angular/core/testing';

import { HomeToCoverGuard } from './home-to-cover.guard';

describe('HomeToCoverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeToCoverGuard]
    });
  });

  it('should ...', inject([HomeToCoverGuard], (guard: HomeToCoverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
