import { TestBed } from '@angular/core/testing';

import { VisitorService } from './visitor.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('VisitorService', () => {
  let service: VisitorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ VisitorService ]
    });
    service = TestBed.inject(VisitorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
