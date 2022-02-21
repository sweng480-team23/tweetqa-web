import { Injectable } from '@angular/core';
import { QAModelResponseV1 } from "../dtos/v1/qa-model.dto.v1";
import { AbstractReadService } from "./abstract-read.service";
import {HttpClient} from "@angular/common/http";
import {ApiMapping} from "../util/api-mapping";
import {Observable} from "rxjs";
import {WordCloudResponseV1} from "../dtos/v1/word-cloud.dto.v1";

@Injectable()
export class QaModelService extends AbstractReadService<QAModelResponseV1>{

  constructor(protected http: HttpClient) {
    super(http, 1, ApiMapping.MODELS.getPath);
  }

  public readAllModelsByType(modelType: string, params?: {}): Observable<QAModelResponseV1[]> {
    return this.http.get<QAModelResponseV1[]>(
      `v${this.version}/${this.endpoint}/${modelType}`,
      { params });
  }

  public getWordCloud(id: number, params?: {}): Observable<WordCloudResponseV1> {
    return this.http.get<WordCloudResponseV1>(
      `v${this.version}/${this.endpoint}/${id}/wordcloud`,
      { params });
  }

}
