import { TestBed } from '@angular/core/testing';

import { AbstractReadService } from './abstract-read.service';

describe('AbstractReadService', () => {
  let service: AbstractReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
