import { Injectable } from '@angular/core';
import { AbstractCreateReadUpdateService } from "./abstract/abstract-create-read-update.service";
import { PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2 } from "../dtos/v2/prediction.dto.v2";
import { HttpClient } from "@angular/common/http";
import { ApiMapping } from "../constants/api-mapping";
import { DataResponseV2} from '../dtos/v2/data.dto.v2';
import { map } from 'rxjs/operators';


@Injectable()
export class PredictionService extends AbstractCreateReadUpdateService<
   PredictionCreateRequestV2, PredictionResponseV2, PredictionUpdateRequestV2> {

  constructor(protected http: HttpClient) {
    super(http, 2, ApiMapping.PREDICTIONS.getPath);
  }

  //Service to get random tweet
  public getRandomTweet(){
    return this.http.get<DataResponseV2>(
      `v2/data/random`
    ).pipe(
      map((response:DataResponseV2) => {
        return response;
      }))
  }
}
