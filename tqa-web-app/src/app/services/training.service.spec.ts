import { TestBed } from '@angular/core/testing';

import { TrainingService } from './training.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TrainingService', () => {
  let service: TrainingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TrainingService ]
    });
    service = TestBed.inject(TrainingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
