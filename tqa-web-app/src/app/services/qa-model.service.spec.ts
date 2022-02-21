import { TestBed } from '@angular/core/testing';
import { QaModelService } from './qa-model.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { WordCloudResponseV1 } from "../dtos/v1/word-cloud.dto.v1";
import { QAModelCollectionResponseV1 } from "../dtos/v1/qa-model.dto.v1";
import { mockQAModelCollectionResponseV1 } from "../dtos/v1/mock/qa-model.dto.v1.mock";
import { mockWordCloudResponseV1 } from "../dtos/v1/mock/word-cloud.dto.v1.mock";
import {ApiMapping} from "../util/api-mapping";

describe('QaModelService', () => {
  let service: QaModelService;
  let httpMock: HttpTestingController;
  let mockWordCloudResponse: WordCloudResponseV1;
  let mockQAModelCollectResponse: QAModelCollectionResponseV1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ QaModelService ]
    });
    service = TestBed.inject(QaModelService);
    httpMock = TestBed.inject(HttpTestingController);
    mockWordCloudResponse = mockWordCloudResponseV1(100)();
    mockQAModelCollectResponse = mockQAModelCollectionResponseV1(10)();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('readAllModelsByType() should GET list of QAModelResponseV1', () => {
    let modelType: string = 'BERT'
    service.readAllModelsByType(modelType).subscribe(response => {
      expect(response).toEqual(mockQAModelCollectResponse.collection);
    });
    const request = httpMock.expectOne({
      method: 'GET',
      url: `v${service.getVersion()}/${ApiMapping.MODELS.getPath}/${modelType}`
    });
    request.flush(mockQAModelCollectResponse.collection);
  });

  it('getWordCloud() should GET WordCloudResponseV1', () => {
    let modelId: number = 1;
    service.getWordCloud(modelId).subscribe(response => {
      expect(response).toEqual(mockWordCloudResponse);
    });
    const request = httpMock.expectOne({
      method: 'GET',
      url: `v${service.getVersion()}/${ApiMapping.MODELS.getPath}/${modelId}/wordcloud`
    });
    request.flush(mockWordCloudResponse);
  });

});
