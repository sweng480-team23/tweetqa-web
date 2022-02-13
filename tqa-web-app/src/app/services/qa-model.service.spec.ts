import { TestBed } from '@angular/core/testing';

import { QaModelService } from './qa-model.service';

describe('QaModelService', () => {
  let service: QaModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QaModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
