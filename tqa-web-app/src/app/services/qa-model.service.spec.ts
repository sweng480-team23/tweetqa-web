import { TestBed } from '@angular/core/testing';
import { QaModelService } from './qa-model.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { WordCloudResponseV2 } from "../dtos/v2/word-cloud.dto.v2";
import { QAModelCollectionResponseV2 } from "../dtos/v2/qa-model.dto.v2";
import { mockQAModelCollectionResponseV2 } from "../dtos/v2/mock/qa-model.dto.v2.mock";
import { mockWordCloudResponseV2 } from "../dtos/v2/mock/word-cloud.dto.v2.mock";
import { ApiMapping } from "../util/api-mapping";

describe('QaModelService', () => {
  let service: QaModelService;
  let httpMock: HttpTestingController;
  let mockWordCloudResponse: WordCloudResponseV2;
  let mockQAModelCollectResponse: QAModelCollectionResponseV2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ QaModelService ]
    });
    service = TestBed.inject(QaModelService);
    httpMock = TestBed.inject(HttpTestingController);
    mockWordCloudResponse = mockWordCloudResponseV2(100)();
    mockQAModelCollectResponse = mockQAModelCollectionResponseV2(10)();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('readAllModelsByType() should GET list of QAModelResponseV2', () => {
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

  it('getWordCloud() should GET WordCloudResponseV2', () => {
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
