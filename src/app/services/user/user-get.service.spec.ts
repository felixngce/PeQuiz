import { TestBed } from '@angular/core/testing';

import { UserGetService } from './user-get.service';

describe('UserGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGetService = TestBed.get(UserGetService);
    expect(service).toBeTruthy();
  });
});
