import { Injectable } from '@angular/core';
import { AbstractCreateReadService } from "./abstract/abstract-create-read.service";
import { TrainingCreateRequestV2, TrainingResponseV2 } from "../dtos/v2/training.dto.v2";
import { HttpClient } from "@angular/common/http";
import { ApiMapping } from "../constants/api-mapping";

@Injectable()
export class TrainingService extends AbstractCreateReadService<TrainingCreateRequestV2, TrainingResponseV2> {

  constructor(protected http: HttpClient) {
    super(http, 2, ApiMapping.TRAINING.getPath);
  }

}
