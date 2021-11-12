import { Injectable } from '@angular/core';
import { AbstractCreateReadUpdateService } from "./abstract-create-read-update.service";
import { PredictionCreateRequestV1, PredictionResponseV1, PredictionUpdateRequestV1 } from "../dtos/v1/prediction.dto.v1";
import { HttpClient } from "@angular/common/http";
import { ApiMapping } from "../util/api-mapping";

@Injectable({
  providedIn: 'root'
})
export class PredictionService extends AbstractCreateReadUpdateService<
   PredictionCreateRequestV1, PredictionResponseV1, PredictionUpdateRequestV1> {

  constructor(protected http: HttpClient) {
    super(http, 1, ApiMapping.PREDICTIONS.getPath);
  }

}
