import { TestBed } from '@angular/core/testing';

import { PredictionService } from './prediction.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import {
  mockPredictionCreateRequestV1,
  mockPredictionResponseFromCreateRequestV1, mockPredictionUpdateRequestWithIdV1
} from "../dtos/v1/mock/prediction.dto.v1.mock";
import {PredictionCreateRequestV1, PredictionResponseV1, PredictionUpdateRequestV1} from "../dtos/v1/prediction.dto.v1";
import { ApiMapping } from "../util/api-mapping";

describe('PredictionService', () => {
  let service: PredictionService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let prediction: PredictionResponseV1;
  let createRequest: PredictionCreateRequestV1;
  let updateRequest: PredictionUpdateRequestV1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PredictionService ]
    });
    service = TestBed.inject(PredictionService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    createRequest = mockPredictionCreateRequestV1();
    prediction = mockPredictionResponseFromCreateRequestV1(createRequest);
    updateRequest = mockPredictionUpdateRequestWithIdV1(prediction.id);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should POST PredictionCreateRequestV1 and receive PredictionResponseV1', () => {
    service.create(createRequest).subscribe(response => {
      expect(response).toEqual(prediction);
    });
    const request = httpMock.expectOne({
      method: 'POST',
      url: `v1/${ApiMapping.PREDICTIONS.getPath}`
    });
    request.flush(prediction);
  });

  it('read() should GET PredictionResponseV1', () => {
    service.read(prediction.id).subscribe(response => {
      expect(response).toEqual(prediction);
    });
    const request = httpMock.expectOne({
      method: 'GET',
      url: `v1/${ApiMapping.PREDICTIONS.getPath}/${prediction.id}`
    });
    request.flush(prediction);
  });

  it('update() should PUT PredictionUpdateRequestV1 and receive PredictionResponseV1', () => {
    service.update(prediction.id, updateRequest).subscribe(response => {
      expect(response.id).toEqual(prediction.id);
    });
    const request = httpMock.expectOne({
      method: 'PUT',
      url: `v1/${ApiMapping.PREDICTIONS.getPath}/${prediction.id}`
    });
    request.flush({
      ...prediction,
      alt_answer: updateRequest.alt_answer,
      is_correct: updateRequest.is_correct
    } as PredictionResponseV1)
  });

  afterEach(() => {
    httpMock.verify();
  });

});
