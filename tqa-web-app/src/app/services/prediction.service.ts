import { Injectable } from '@angular/core';
import { AbstractCreateReadUpdateService } from "./abstract-create-read-update.service";
import { PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2 } from "../dtos/v2/prediction.dto.v2";
import { HttpClient } from "@angular/common/http";
import { ApiMapping } from "../util/api-mapping";


@Injectable()
export class PredictionService extends AbstractCreateReadUpdateService<
   PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2> {

  constructor(protected http: HttpClient) {
    super(http, 2, ApiMapping.PREDICTIONS.getPath);
  }

}
