import { TestBed } from '@angular/core/testing';

import { PredictionService } from './prediction.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {
  mockPredictionCreateRequestV2,
  mockPredictionResponseFromCreateRequestV2, mockPredictionUpdateRequestWithIdV2
} from "../dtos/v2/mock/prediction.dto.v2.mock";
import { PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2 } from "../dtos/v2/prediction.dto.v2";
import { ApiMapping } from "../constants/api-mapping";

describe('PredictionService', () => {
  let service: PredictionService;
  let httpMock: HttpTestingController;
  let prediction: PredictionResponseV2;
  let createRequest: PredictionCreateRequestV2;
  let updateRequest: PredictionUpdateRequestV2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PredictionService ]
    });
    service = TestBed.inject(PredictionService);
    httpMock = TestBed.inject(HttpTestingController);
    createRequest = mockPredictionCreateRequestV2();
    prediction = mockPredictionResponseFromCreateRequestV2(createRequest);
    updateRequest = mockPredictionUpdateRequestWithIdV2(prediction.id);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should POST PredictionCreateRequestV2 and receive PredictionResponseV2', () => {
    service.create(createRequest).subscribe(response => {
      expect(response).toEqual(prediction);
    });
    const request = httpMock.expectOne({
      method: 'POST',
      url: `v2/${ApiMapping.PREDICTIONS.getPath}`
    });
    request.flush(prediction);
  });

  it('read() should GET PredictionResponseV2', () => {
    service.read(prediction.id).subscribe(response => {
      expect(response).toEqual(prediction);
    });
    const request = httpMock.expectOne({
      method: 'GET',
      url: `v2/${ApiMapping.PREDICTIONS.getPath}/${prediction.id}`
    });
    request.flush(prediction);
  });

  it('update() should PUT PredictionUpdateRequestV2 and receive PredictionResponseV2', () => {
    service.update(prediction.id, updateRequest).subscribe(response => {
      expect(response.id).toEqual(prediction.id);
    });
    const request = httpMock.expectOne({
      method: 'PUT',
      url: `v2/${ApiMapping.PREDICTIONS.getPath}/${prediction.id}`
    });
    request.flush({
      ...prediction,
      alt_answer: updateRequest.alt_answer,
      is_correct: updateRequest.is_correct
    } as PredictionResponseV2)
  });

  afterEach(() => {
    httpMock.verify();
  });

});
