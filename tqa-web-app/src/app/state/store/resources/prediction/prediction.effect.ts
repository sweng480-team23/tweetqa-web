import { Injectable } from "@angular/core";
import { CreateReadResourceEffect } from "../create-read-resource.effect";
import { PredictionCreateRequestV2, PredictionResponseV2 } from "../../../../dtos/v2/prediction.dto.v2";
import { PredictionService } from "../../../../services/prediction.service";
import { typePrefix } from "./prediction.action";
import { Actions } from "@ngrx/effects";

@Injectable()
export class PredictionEffect extends CreateReadResourceEffect<
  PredictionCreateRequestV2,
  PredictionResponseV2,
  PredictionService>
{

  constructor(protected action$: Actions, protected service: PredictionService) {
    super(action$, service, typePrefix);
  }

}
