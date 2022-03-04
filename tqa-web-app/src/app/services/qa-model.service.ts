import { Injectable } from '@angular/core';
import { QAModelResponseV2 } from "../dtos/v2/qa-model.dto.v2";
import { AbstractReadService } from "./abstract/abstract-read.service";
import { HttpClient } from "@angular/common/http";
import { ApiMapping } from "../util/api-mapping";
import { Observable } from "rxjs";
import { WordCloudResponseV2 } from "../dtos/v2/word-cloud.dto.v2";

@Injectable()
export class QaModelService extends AbstractReadService<QAModelResponseV2>{

  constructor(protected http: HttpClient) {
    super(http, 2, ApiMapping.MODELS.getPath);
  }

  public readAllModelsByType(modelType: string, params?: {}): Observable<QAModelResponseV2[]> {
    return this.http.get<QAModelResponseV2[]>(
      `v${this.version}/${this.endpoint}/${modelType}`,
      { params });
  }

  public getWordCloud(id: number, params?: {}): Observable<WordCloudResponseV2> {
    return this.http.get<WordCloudResponseV2>(
      `v${this.version}/${this.endpoint}/${id}/wordcloud`,
      { params });
  }

}
